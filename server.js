import express from 'express';
import initSqlJs from 'sql.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import Stripe from 'stripe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '.env') });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const app = express();
const port = 3001;

// Use built-in JSON middleware
app.use(express.json());

// Initialize SQLite Database (Using sql.js for Vercel support)
let db;

async function setupDatabase() {
  const SQL = await initSqlJs();
  
  let dbBuffer;
  let dbPath;
  
  if (process.env.VERCEL) {
    dbPath = '/tmp/database.sqlite';
  } else {
    const dbDir = resolve(__dirname, 'data');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir);
    }
    dbPath = resolve(dbDir, 'database.sqlite');
  }

  // Load existing DB or create new
  if (fs.existsSync(dbPath)) {
    dbBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(dbBuffer);
  } else {
    db = new SQL.Database();
  }

  // Setup Schema
  db.run(`
    CREATE TABLE IF NOT EXISTS availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,         
      slot TEXT NOT NULL,         
      is_blocked INTEGER NOT NULL DEFAULT 0, 
      UNIQUE(date, slot)
    );

    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      garage_size TEXT NOT NULL,
      date TEXT NOT NULL,
      slot TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending_deposit',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(date, slot) REFERENCES availability(date, slot)
    );
  `);
  
  // Save initial empty DB if it didn't exist
  if (!fs.existsSync(dbPath)) {
      saveDatabase();
  }
}

function saveDatabase() {
    if (!db) return;
    const data = db.export();
    const buffer = Buffer.from(data);
    
    let dbPath = process.env.VERCEL ? '/tmp/database.sqlite' : resolve(__dirname, 'data', 'database.sqlite');
    fs.writeFileSync(dbPath, buffer);
}

// Call setup immediately
setupDatabase();

// API Endpoints

// 1. Get Availability for a given month or range
app.get('/api/availability', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not ready' });

  const { start, end } = req.query; 
  let results = [];
  
  if (start && end) {
    const stmt = db.prepare('SELECT * FROM availability WHERE date >= ? AND date <= ?');
    stmt.bind([start, end]);
    while(stmt.step()) {
        results.push(stmt.getAsObject());
    }
    stmt.free();
  } else {
    const stmt = db.prepare('SELECT * FROM availability');
    while(stmt.step()) {
        results.push(stmt.getAsObject());
    }
    stmt.free();
  }
  res.json(results);
});

// 2. Admin: Toggle Slot Blocked Status
app.post('/api/admin/block-slot', (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not ready' });

  const { date, slot, is_blocked } = req.body;
  
  if (!date || !slot || is_blocked === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const stmt = db.prepare(`
    INSERT INTO availability (date, slot, is_blocked)
    VALUES (?, ?, ?)
    ON CONFLICT(date, slot) DO UPDATE SET is_blocked = excluded.is_blocked
  `);
  
  stmt.run([date, slot, is_blocked ? 1 : 0]);
  stmt.free();
  
  saveDatabase();
  
  res.json({ success: true });
});

// 3. User: Create Reservation (Pending Deposit) & Stripe Checkout
app.post('/api/reserve', async (req, res) => {
  if (!db) return res.status(503).json({ error: 'Database not ready' });

  const { name, phone, email, address, garage_size, date, slot } = req.body;

  if (!name || !phone || !email || !date || !slot) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  try {
    // Check if it's already blocked
    const checkStmt = db.prepare('SELECT is_blocked FROM availability WHERE date = ? AND slot = ?');
    checkStmt.bind([date, slot]);
    let existing = null;
    if (checkStmt.step()) {
        existing = checkStmt.getAsObject();
    }
    checkStmt.free();
    
    if (existing && existing.is_blocked) {
      throw new Error('Slot is already unavailable');
    }

    // Mark slot as blocked temporarily (payment pending)
    const blockStmt = db.prepare(`
      INSERT INTO availability (date, slot, is_blocked)
      VALUES (?, ?, 1)
      ON CONFLICT(date, slot) DO UPDATE SET is_blocked = 1
    `);
    blockStmt.run([date, slot]);
    blockStmt.free();

    // Insert reservation as pending
    const reserveStmt = db.prepare(`
      INSERT INTO reservations (name, phone, email, address, garage_size, date, slot, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending_deposit')
    `);
    reserveStmt.run([name, phone, email, address || '', garage_size || '', date, slot]);
    reserveStmt.free();
    
    // Get the last inserted ID
    const resStmt = db.prepare('SELECT last_insert_rowid() as id');
    resStmt.step();
    const reservationId = resStmt.getAsObject().id;
    resStmt.free();

    saveDatabase();

    // Generate Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Garage Recovery Reservation Deposit',
              description: `Date: ${date} | Window: ${slot.charAt(0).toUpperCase() + slot.slice(1)}`,
            },
            unit_amount: 10000, // $100.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/contact`,
      customer_email: email,
      client_reference_id: reservationId.toString(),
      metadata: {
        date,
        slot,
        address
      }
    });

    res.json({ success: true, checkoutUrl: session.url });

  } catch (error) {
    console.error('Reservation/Stripe error:', error);
    res.status(400).json({ error: error.message || 'Failed to initialize checkout' });
  }
});

// Start server
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Backend API running at http://localhost:${port}`);
  });
}

export default app;

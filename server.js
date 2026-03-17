import express from 'express';
import Database from 'better-sqlite3';
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

// Initialize SQLite Database
let dbPath;
if (process.env.VERCEL) {
  // Vercel serverless functions have a read-only filesystem except for /tmp
  dbPath = '/tmp/database.sqlite';
} else {
  const dbDir = resolve(__dirname, 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }
  dbPath = resolve(dbDir, 'database.sqlite');
}
const db = new Database(dbPath, { verbose: console.log });
db.pragma('journal_mode = WAL');

// Setup Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,         -- YYYY-MM-DD
    slot TEXT NOT NULL,         -- 'morning' (8am-12pm) or 'afternoon' (1pm-5pm)
    is_blocked INTEGER NOT NULL DEFAULT 0, -- 1 if admin blocked or reserved
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

// API Endpoints

// 1. Get Availability for a given month or range
app.get('/api/availability', (req, res) => {
  const { start, end } = req.query; // YYYY-MM-DD format
  let stmt;
  
  if (start && end) {
    stmt = db.prepare('SELECT * FROM availability WHERE date >= ? AND date <= ?');
    res.json(stmt.all(start, end));
  } else {
    stmt = db.prepare('SELECT * FROM availability');
    res.json(stmt.all());
  }
});

// 2. Admin: Toggle Slot Blocked Status
app.post('/api/admin/block-slot', (req, res) => {
  const { date, slot, is_blocked } = req.body;
  
  if (!date || !slot || is_blocked === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const stmt = db.prepare(`
    INSERT INTO availability (date, slot, is_blocked)
    VALUES (?, ?, ?)
    ON CONFLICT(date, slot) DO UPDATE SET is_blocked = excluded.is_blocked
  `);
  
  const info = stmt.run(date, slot, is_blocked ? 1 : 0);
  res.json({ success: true, changes: info.changes });
});

// 3. User: Create Reservation (Pending Deposit) & Stripe Checkout
app.post('/api/reserve', async (req, res) => {
  const { name, phone, email, address, garage_size, date, slot } = req.body;

  if (!name || !phone || !email || !date || !slot) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  try {
    const transaction = db.transaction(() => {
      // Check if it's already blocked
      const checkStmt = db.prepare('SELECT is_blocked FROM availability WHERE date = ? AND slot = ?');
      const existing = checkStmt.get(date, slot);
      
      if (existing && existing.is_blocked) {
        throw new Error('Slot is already unavailable');
      }

      // Mark slot as blocked temporarily (payment pending)
      const blockStmt = db.prepare(`
        INSERT INTO availability (date, slot, is_blocked)
        VALUES (?, ?, 1)
        ON CONFLICT(date, slot) DO UPDATE SET is_blocked = 1
      `);
      blockStmt.run(date, slot);

      // Insert reservation as pending
      const reserveStmt = db.prepare(`
        INSERT INTO reservations (name, phone, email, address, garage_size, date, slot, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending_deposit')
      `);
      const info = reserveStmt.run(name, phone, email, address || '', garage_size || '', date, slot);
      
      return info.lastInsertRowid;
    });

    const reservationId = transaction();

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

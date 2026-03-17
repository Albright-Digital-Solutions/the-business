import express from 'express';
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

app.use(express.json());

// Initialize JSON Database
const dbPath = process.env.VERCEL 
  ? '/tmp/database.json' 
  : resolve(__dirname, 'data', 'database.json');

let db = { availability: [], reservations: [] };

function loadDatabase() {
  try {
    if (!process.env.VERCEL && !fs.existsSync(resolve(__dirname, 'data'))) {
      fs.mkdirSync(resolve(__dirname, 'data'));
    }
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      db = JSON.parse(data);
    } else {
      saveDatabase();
    }
  } catch (err) {
    console.error('Error loading DB:', err);
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving DB:', err);
  }
}

loadDatabase();

// API Endpoints

app.get('/api/availability', (req, res) => {
  const { start, end } = req.query; 
  let results = db.availability || [];
  
  if (start && end) {
    results = results.filter(a => a.date >= start && a.date <= end);
  }
  
  res.json(results);
});

app.post('/api/admin/block-slot', (req, res) => {
  const { date, slot, is_blocked } = req.body;
  if (!date || !slot || is_blocked === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const index = db.availability.findIndex(a => a.date === date && a.slot === slot);
  if (index >= 0) {
    db.availability[index].is_blocked = is_blocked ? 1 : 0;
  } else {
    db.availability.push({ id: Date.now(), date, slot, is_blocked: is_blocked ? 1 : 0 });
  }
  
  saveDatabase();
  res.json({ success: true });
});

app.post('/api/reserve', async (req, res) => {
  const { name, phone, email, address, garage_size, date, slot } = req.body;

  if (!name || !phone || !email || !date || !slot) {
    return res.status(400).json({ error: 'Missing required reservation fields' });
  }

  try {
    const existing = db.availability.find(a => a.date === date && a.slot === slot);
    if (existing && existing.is_blocked) {
      throw new Error('Slot is already unavailable');
    }

    if (existing) {
      existing.is_blocked = 1;
    } else {
      db.availability.push({ id: Date.now(), date, slot, is_blocked: 1 });
    }

    const reservationId = Date.now();
    db.reservations.push({
      id: reservationId,
      name, phone, email, address, garage_size, date, slot,
      status: 'pending_deposit',
      created_at: new Date().toISOString()
    });

    saveDatabase();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Garage Recovery Reservation Deposit',
            description: `Date: ${date} | Window: ${slot.charAt(0).toUpperCase() + slot.slice(1)}`,
          },
          unit_amount: 10000,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `https://the-business.vercel.app/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://the-business.vercel.app/contact`,
      customer_email: email,
      client_reference_id: reservationId.toString(),
      metadata: { date, slot, address }
    });

    res.json({ success: true, checkoutUrl: session.url });

  } catch (error) {
    console.error('Reservation/Stripe error:', error);
    res.status(400).json({ error: error.message || 'Failed to initialize checkout' });
  }
});

export default app;

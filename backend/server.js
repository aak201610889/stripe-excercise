const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5009;

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { products } = req.body;
    
    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    const line_items = products.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
        },
        unit_amount: Math.round(product.price * 100), // in cents
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`,
    });

    res.json({ id: session.id, url: session.url });

  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/refund', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Missing paymentIntentId' });
    }

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    res.status(200).json({ success: true, refund });
  } catch (err) {
    console.error('Refund Error:', err);
    res.status(500).json({ error: 'Refund failed' });
  }
});



app.get('/session/:id', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);
    return res.json({ paymentIntentId: session.payment_intent });
  } catch (err) {
    console.error("Error retrieving session:", err);
    res.status(500).json({ error: 'Failed to retrieve session' });
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
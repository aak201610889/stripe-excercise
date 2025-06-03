const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const port=process.env.PORT

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('create-checkout-session',async(req,res)=>{
  const {products}=req.body;

  const line_items=products.map(p=>({
    price_data:{
      currency:'usd',
      product_data:{
        name:p.title
      },
         unit_amount: p.price * 100, // in cents
    },
    quantity: p.quantity,
    
  }))
try {

const session=await stripe.checkout.session.create({
  payment_method_types:['card'],
  made:'payment',
  line_items,
  success_url:'http://localhost:300/success',
  cancel_url:'http://localhost:300/cancel'
})
res.json({url:session.url})


} catch (error) {
      res.status(500).json({ error: error.message });
}

})


app.listen(port , console.log(`server on port ${port}`)
)
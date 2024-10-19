const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

require("dotenv").config(); // Load environment variables
// Now you can use the stripe instance

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Now you can use the stripe instance


// get the key above from stripe

// API

// App config

const app = express();

// Middlewares

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json())
// API routes

app.get("/", (request, response) => response.status(200).send("Hello World!"));

app.get("/Jed", (request, response) =>
  response.status(200).send("Hello Jed you doing great!"),
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total; // you can use params as well

  console.log("Payment Received Congratulations!! for this amount >>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // OK - Created(MISSING piece of code)
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
}); // a post request

// Listen command

/* the .api will be defined on the last part of the endpoint -http://127.0.0.1:5001/clone-a09e4/us-central1/api */
exports.api = functions.https.onRequest(app);

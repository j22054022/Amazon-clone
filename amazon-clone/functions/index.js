// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request } = require("express");
const stripe = require("stripe")(
  "sk_test_51JutcvHNUyqifVaM1NPhCHLJMzR3bNK3Kzrj371GQJyogLkYarzgHQOxAnwuglErbRC29OhEpVYBZo4ZIzLpKnor00vtoMQgIG"
);

// API

// API config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API route
app.get("/", (request, response) => response.status(200).send("hey"));
app.get("/j22054022", (req, res) => {res.status(200).send('hey, j22054022')})

app.post("/payment/create", async (request, response) => {
  // 取得url的total變數
  const total = request.query.total;

  console.log(`payment request recieved, amount: ${total}`);
  // Create a PaymentIntent on the server and pass its client secret to the client instead of passing the entire PaymentIntent object.
  // Use the Payment Intents API to build an integration that can handle complex payment flows. It tracks a payment from creation through checkout, and triggers additional authentication steps when required.
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    // payment_method_types: ["card"],
  });
  //  HTTP 201 Created 成功狀態碼表示請求成功且有一個新的資源已經依據需要而被建立。實際上，在此回應傳送前，新資源就已被建立，且其內容在訊息的主體中傳回，其位置為請求的 URL
  response.status(201).send({
    // 可以從docs查看透過paymentIntent API 回傳的paymentIntent的所有屬性
    //  https://stripe.com/docs/api/payment_intents/object
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
// 因exports.api，所以URL末端為api
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/clone-490fc/us-central1/api
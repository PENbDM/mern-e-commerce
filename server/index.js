import express from "express";
import cors from "cors"; // Import the cors middleware
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import stripeRoute from "./routes/stripe.js";
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.status(500).send("Server is running");
});
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server OK");
});

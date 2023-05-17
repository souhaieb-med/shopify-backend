import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

//Middlewares
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());

// Import and use routes
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/carts.js";
import orderRoutes from "./routes/orders.js";
import stripeRoute from "./routes/stripe.js"

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/checkout", stripeRoute)

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is running");
});

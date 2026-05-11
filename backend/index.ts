import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controllers/product.controller.js";
import { validate } from "./middlewares/validate.js";
import { productSchema, updateProductSchema } from "./validations/product.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

// Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.get("/api/products/", getProducts);
app.get("/api/products/:id", getProductById);

// Protected/Validated Routes
app.post("/api/products/", validate(productSchema), createProduct);
app.put("/api/products/:id", validate(updateProductSchema), updateProduct);
app.delete("/api/products/:id", deleteProduct);

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

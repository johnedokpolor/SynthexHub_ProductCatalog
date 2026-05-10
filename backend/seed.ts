import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/product.model.js";

dotenv.config();

const seedProducts = [
  {
    name: "Gaming Laptop",
    category: "Electronics",
    price: 1200,
    stock: 10,
    description: "High performance gaming laptop",
  },
  {
    name: "Wireless Mouse",
    category: "Accessories",
    price: 25,
    stock: 50,
    description: "Ergonomic 2.4GHz mouse",
  },
  {
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 80,
    stock: 30,
    description: "RGB backlit keys",
  },
  {
    name: "Smartphone",
    category: "Electronics",
    price: 800,
    stock: 15,
    description: "Latest flagship model",
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 45,
    stock: 20,
    description: "Portable waterproof speaker",
  },
  {
    name: "Office Chair",
    category: "Furniture",
    price: 150,
    stock: 5,
    description: "Adjustable height with lumbar support",
  },
  {
    name: "Coffee Maker",
    category: "Appliances",
    price: 60,
    stock: 12,
    description: "Automatic drip coffee machine",
  },
  {
    name: "Desk Lamp",
    category: "Furniture",
    price: 30,
    stock: 25,
    description: "LED eye-protection lamp",
  },
  {
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: 250,
    stock: 8,
    description: "Over-ear active noise cancellation",
  },
  {
    name: "USB-C Hub",
    category: "Accessories",
    price: 40,
    stock: 100,
    description: "7-in-1 multi-port adapter",
  },
  {
    name: "UltraWide Monitor",
    category: "Electronics",
    price: 450,
    stock: 7,
    description: "34-inch curved productivity monitor",
  },
  {
    name: "Webcam 4K",
    category: "Electronics",
    price: 120,
    stock: 15,
    description: "Ultra HD streaming camera",
  },
  {
    name: "Electric Standing Desk",
    category: "Furniture",
    price: 350,
    stock: 4,
    description: "Motorized height adjustable desk",
  },
  {
    name: "Leather Journal",
    category: "Stationery",
    price: 25,
    stock: 40,
    description: "Handmade refillable notebook",
  },
  {
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 90,
    stock: 25,
    description: "True wireless with touch controls",
  },
  {
    name: "Gel Pen Set",
    category: "Stationery",
    price: 15,
    stock: 100,
    description: "12-pack multicolor gel pens",
  },
  {
    name: "External SSD 1TB",
    category: "Electronics",
    price: 110,
    stock: 20,
    description: "High-speed portable storage",
  },
  {
    name: "Yoga Mat",
    category: "Fitness",
    price: 35,
    stock: 30,
    description: "Non-slip eco-friendly mat",
  },
  {
    name: "Adjustable Dumbbells",
    category: "Fitness",
    price: 200,
    stock: 6,
    description: "Space-saving weight set",
  },
  {
    name: "Laptop Stand",
    category: "Accessories",
    price: 35,
    stock: 45,
    description: "Aluminum foldable riser",
  },
  {
    name: "Drawing Tablet",
    category: "Electronics",
    price: 180,
    stock: 12,
    description: "Pressure-sensitive stylus tablet",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 220,
    stock: 18,
    description: "Fitness tracker with heart rate monitor",
  },
  {
    name: "Water Bottle",
    category: "Fitness",
    price: 20,
    stock: 60,
    description: "Insulated stainless steel 32oz",
  },
  {
    name: "Backpack",
    category: "Accessories",
    price: 55,
    stock: 22,
    description: "Water-resistant laptop bag",
  },
  {
    name: "Gaming Mouse Pad",
    category: "Accessories",
    price: 18,
    stock: 80,
    description: "Extended XXL cloth surface",
  },
  {
    name: "Desk Mat",
    category: "Furniture",
    price: 22,
    stock: 35,
    description: "Vegan leather protector",
  },
  {
    name: "Microphone Arm",
    category: "Accessories",
    price: 45,
    stock: 14,
    description: "Heavy-duty boom arm for streaming",
  },
  {
    name: "Ring Light",
    category: "Electronics",
    price: 30,
    stock: 28,
    description: "10-inch light with tripod stand",
  },
  {
    name: "Power Bank",
    category: "Electronics",
    price: 50,
    stock: 40,
    description: "20,000mAh fast-charging battery",
  },
  {
    name: "Mechanical Pencil",
    category: "Stationery",
    price: 8,
    stock: 150,
    description: "0.5mm drafting pencil",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB for seeding...");

    // 1. Clean existing data
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    // 2. Insert new data
    await Product.insertMany(seedProducts);
    console.log("Database seeded successfully with 10 products!");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();

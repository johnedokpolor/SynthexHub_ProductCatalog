import { Schema, model, Document } from "mongoose";

// 1. Define an interface representing a document in MongoDB
export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  description?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Create the Schema corresponding to the document interface
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      index: true, // Improves search performance
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// 3. Create and export the Model
export const Product = model<IProduct>("Product", productSchema);

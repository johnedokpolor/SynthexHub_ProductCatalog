import { z } from "zod";

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Name is too short").max(50, "Name is too long"),
    category: z.string().min(2, "Category is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().max(500, "Description is too long").optional(),
    stock: z.number().int().nonnegative("Stock cannot be negative").default(0),
  }),
});

// Partial schema for updates (makes all fields optional)
export const updateProductSchema = z.object({
  body: productSchema.shape.body.partial(),
});

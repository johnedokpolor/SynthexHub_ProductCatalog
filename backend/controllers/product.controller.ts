import { Request, Response } from 'express';
import { Product } from '../models/product.model';

/**
 * @desc    Create new product
 * @route   POST /api/products
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all products with Search, Pagination, and Aggregation
 * @route   GET /api/products
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Using MongoDB Aggregation Pipeline for advanced querying
    const products = await Product.aggregate([
      {
        $match: {
          $and: [
            search ? { name: { $regex: search, $options: 'i' } } : {},
            category ? { category: category } : {}
          ]
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: Number(limit) }]
        }
      }
    ]);

    const total = products[0].metadata[0]?.total || 0;

    res.status(200).json({
      success: true,
      count: products[0].data.length,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      },
      data: products[0].data
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Invalid ID format" });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 */
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Server Error" });
  }
};
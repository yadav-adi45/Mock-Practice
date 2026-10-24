import mongoose from "mongoose";
import Product from "../models/product.model.js";

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const errors = [];
    const validCategories = ["Electronics", "Grocery", "Clothing", "Books"];

    if (!name || name.trim().length < 2) errors.push("Name must be at least 2 characters");
    if (!category || !validCategories.includes(category)) errors.push("Invalid category");
    if (price === undefined || typeof price !== "number" || price <= 0) errors.push("Price must be > 0");
    if (stock === undefined || typeof stock !== "number" || !Number.isInteger(stock) || stock < 0) {
      errors.push("Stock must be an integer >= 0");
    }

    if (errors.length > 0) return res.status(400).json({ success: false, errors });

    const existing = await Product.findOne({ name: name.trim() });
    if (existing) return res.status(409).json({ success: false, message: "Product name already exists" });

    const product = await Product.create({ name: name.trim(), category, price, stock });
    return res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ success: false, message: "Duplicate product" });
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort, page = 1, limit = 5 } = req.query;
    const query = {};

    if (search) query.name = { $regex: search.trim(), $options: "i" };
    if (category && category !== "All") query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOptions = { createdAt: -1 };
    if (sort === "price_asc") sortOptions = { price: 1 };
    if (sort === "price_desc") sortOptions = { price: -1 };

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(limitNum);

    return res.status(200).json({
      success: true,
      data: products,
      meta: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH /api/products/:id/stock
export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { change } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.stock + change < 0) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    product.stock += change;
    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

import express from "express";
import {
  createProduct,
  getProducts,
  updateStock,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/api/products", createProduct);
router.get("/api/products", getProducts);
router.patch("/api/products/:id/stock", updateStock);

export default router;

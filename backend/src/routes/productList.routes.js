// src/routes/productList.routes.js
import { Router } from "express";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "../controllers/productList.controller.js";

const router = Router();

// GET /api/product-lists/featured
router.get("/featured", getFeaturedProducts);

// GET /api/product-lists/Latest
router.get("/Latest", getLatestProducts);

export default router;

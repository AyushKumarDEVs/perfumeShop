// src/routes/productList.routes.js
import { Router } from "express";
import {
  getFeaturedProducts,
  getTrendingProducts,
} from "../controllers/productList.controller.js";

const router = Router();

// GET /api/product-lists/featured
router.get("/featured", getFeaturedProducts);

// GET /api/product-lists/trending
router.get("/trending", getTrendingProducts);

export default router;

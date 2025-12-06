// src/controllers/productList.controller.js
import ProductList from "../models/ProductList.model.js";
import Product from "../models/Product.model.js";

// GET /api/product-lists/featured
export async function getFeaturedProducts(req, res) {
  try {
    const featuredList = await ProductList.findOne({
      title: "Featured Products",
    }).populate("productsArray"); // populate Product docs

    if (!featuredList) {
      return res.status(404).json({ message: "Featured products list not found" });
    }

    return res.json({
      title: featuredList.title,
      products: featuredList.productsArray,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET /api/product-lists/Latest
export async function getLatestProducts(req, res) {
  try {
    const LatestList = await ProductList.findOne({
      title: "Latest Products",
    }).populate("productsArray");

    if (!LatestList) {
      return res.status(404).json({ message: "Latest products list not found" });
    }

    return res.json({
      title: LatestList.title,
      products: LatestList.productsArray,
    });
  } catch (error) {
    console.error("Error fetching Latest products:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

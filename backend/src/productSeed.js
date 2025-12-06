// src/seed/ProductSeed.js
import dotenv from "dotenv"
dotenv.config({
    path:".env"
})

import { connect } from "mongoose";
import Product from "../src/models/Product.model.js";
import sampleProducts from "./sampleProducts.js";

// DB Connection using mongoose
async function connectDB() {
  try {
     await connect(`${process.env.MONGO_URI}`)
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
}

async function seedProducts() {
  try {
    await connectDB();

    // Clear previous products to avoid duplicates
    await Product.deleteMany();
    console.log("🗑 Existing Products removed");

    // Insert new sample Products
    const created = await Product.insertMany(sampleProducts);
    console.log(`🎉 ${created.length} Products inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seedProducts();

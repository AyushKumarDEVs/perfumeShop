import dotenv from "dotenv";
import { connect } from "mongoose";
import Product from "../src/models/Product.model.js";
import ProductList from "../src/models/ProductList.model.js";

dotenv.config({ path: ".env" });

// DB Connection using mongoose
async function connectDB() {
  try {
    await connect(process.env.MONGO_URI); // e.g. mongodb://127.0.0.1:27017/testDatabase
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
}

// simple shuffle helper
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function seedProductLists() {
  try {
    await connectDB();

    // 1. Get all products
    const products = await Product.find({});
    if (!products.length) {
      console.log("⚠️ No products found. Seed products first, then run this script.");
      process.exit(0);
    }

    console.log(`📦 Found ${products.length} products in DB`);

    // 2. Shuffle and pick products for featured & Latest
    const shuffled = shuffleArray(products);

    const featuredProducts = shuffled.slice(0, Math.min(8, shuffled.length)); // up to 8
    const LatestProducts = shuffled.slice(
      Math.min(8, shuffled.length),
      Math.min(16, shuffled.length)
    ); // next up to 8

    const featuredIds = featuredProducts.map((p) => p._id);
    const LatestIds = LatestProducts.map((p) => p._id);

    // 3. Remove old lists with same titles (optional but cleaner)
    await ProductList.deleteMany({
      title: { $in: ["Featured Products", "Latest Products"] },
    });
    console.log("🗑 Old Featured/Latest lists removed");

    // 4. Create new lists
    const createdLists = await ProductList.insertMany([
      {
        title: "Featured Products",
        productsArray: featuredIds,
      },
      {
        title: "Latest Products",
        productsArray: LatestIds.length ? LatestIds : featuredIds, // fallback if less products
      },
    ]);

    console.log(
      `🎉 Created ${createdLists.length} lists: Featured (${featuredIds.length}), Latest (${LatestIds.length || featuredIds.length})`
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding ProductLists failed:", error.message);
    process.exit(1);
  }
}

seedProductLists();

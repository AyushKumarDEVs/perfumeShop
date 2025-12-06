import express from "express";
import dotenv from "dotenv"
dotenv.config({
    path:".env"
})
import cors from "cors"
import router from "./routes/productList.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, 
    methods: "GET,POST,PUT,DELETE",
   
  })
);app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(express.static("public"));


const PORT = process.env.PORT || 3000;



// health route
app.get("/", (req, res) => {
  res.send("Perfume API is running 🚀");
});

// product list routes
app.use("/product-lists", router);

//product routes
app.use("/product", productRoutes);


// connect DB & start server
 export default async function startServer() {
  try {
      app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
}
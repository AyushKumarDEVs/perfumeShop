import express from "express";
import dotenv from "dotenv"
dotenv.config({
    path:".env"
})
import cors from "cors"

const app = express();
app.use(
  cors({
    origin: "*", // ⚠️temporary
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.send("Backend is running...");
});



export default function startServer() {
  app.listen(process.env.PORT||3000, () => {
    console.log("server started");
  });
}
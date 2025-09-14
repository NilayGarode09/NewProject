import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

const app = express();

// Middleware
app.use(express.json({ limit: "30mb" })); // replaces body-parser
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
const CONNECTION_URL =
  process.env.MONGO_URI ||
  "mongodb+srv://nilaygarode9:5ZVycenlawSDIOZM@cluster0.gpfp5xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function main() {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log(" Connected to MongoDB");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
  }
}

main();

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/posts", postRoutes);
app.use("/user", usersRoutes);

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Server listening on port ${PORT}`);
});

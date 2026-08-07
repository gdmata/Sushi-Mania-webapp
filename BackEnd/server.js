const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { MongoClient } = require("mongodb");

const orderRoutes = require("./src/routes/orderRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authCheck = require("./src/routes/authRoute");
const menuRoute = require("./src/routes/menuRoute");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.use(express.static("src"));

// MongoDB Connection Logic
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
let db;

async function connectToMongoDB() {
  if (db) return db;
  await client.connect();
  db = client.db("SushiManiaDB");
  app.locals.db = db;
  return db;
}

// Middleware: Ensure DB is connected for every request
app.use(async (req, res, next) => {
  try {
    await connectToMongoDB();
    next();
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    res.status(500).json({ error: "Erro na conexão com o banco de dados" });
  }
});

// Register routes
app.use(authCheck);
app.use(orderRoutes);
app.use(userRoutes);
app.use(menuRoute);

// Start server locally when not on Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

// Export for Vercel Serverless
module.exports = app;

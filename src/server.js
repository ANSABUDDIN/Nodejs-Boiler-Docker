import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
const { PORT, MONGODB_URI } = process.env;
import "dotenv/config";
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Change * to your specific allowed origins for production.
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use(bodyParser.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
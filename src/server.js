import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import mongoose from "mongoose";
import "dotenv/config";
import Pusher from "pusher";
import cors from "cors";
const { PORT, MONGODB_URI } = process.env;
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Change * to your specific allowed origins for production.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(morgan("dev"));

export const pusher = new Pusher({
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: process.env.cluster,
  useTLS: true,
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

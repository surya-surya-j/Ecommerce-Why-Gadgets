const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./Routes");

const app = express();
app.use(bodyParser.json({ limit: "50mb" })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

const PORT = 8000 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connected to db successfully");
    console.log(PORT, "server is running");
  });
});

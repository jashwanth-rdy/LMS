const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const instructorRoutes = require("./routes/instructor");
require("dotenv").config();

mongoose.connect(`${process.env.URI}`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public/uploads"));

// Instructor routes
app.use("/api/inst", instructorRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port http://localhost:${port}`);
});

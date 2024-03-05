const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const instructorRoutes = require("./routes/instructor");

// const uri = "mongodb+srv://appidijashwanth:ApJaRe1947@lms.cxzmldn.mongodb.net/?retryWrites=true&w=majority&appName=LMS";
const uri = "mongodb://localhost:27017/LMS";
mongoose.connect(uri);

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

app.use("/inst", instructorRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

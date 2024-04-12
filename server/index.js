const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketService = require("./services/socketSerice");
const instructorRoutes = require("./routes/instructor");
const studRoutes = require("./routes/student");
const homeRoutes = require("./routes/home");
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
    origin: ["http://localhost:5173", "http://172.50.2.55:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public/uploads"));

// Instructor routes
app.use("/api/inst", instructorRoutes);
app.use("/api/stud", studRoutes);
app.use("/api", homeRoutes);

const server = http.createServer(app);
socketService(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Serving on port http://localhost:${port}`);
});

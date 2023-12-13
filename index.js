require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db");
const lawyerRoutes = require("./routes/layer.route");
const errorHandler = require("./utils/error");

// Connect to DB
connectDB();

// Express App
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.options("*", cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cookieParser());

// Routes
app.use("/api", lawyerRoutes);

// app.use("/api", (req, res) => {
//   return res.status(200).json({
//     message: "This is working fine !",
//   });
// });

app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});

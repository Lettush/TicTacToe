require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  if (req.body) {
    console.log("Request body:");
    console.log(req.body);
  }
  next();
});

// CORS for querying different domains
const corsOpts = {
  origin: '*',
  credentials: true,
  methods: ['GET','POST','DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type']
};
app.use(cors(corsOpts));

// Routes
app.use("/api/games", require("./src/routes/game"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    mongoose.connection.useDb("ticTacToeDB");
    app.listen(process.env.PORT, () => {
      console.log(
        `Listening on port ${process.env.PORT} and connected to MongoDB`
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

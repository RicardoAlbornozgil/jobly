"use strict";

/** Express app for Jobly. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Route setup
app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);

// Default route for root
app.get("/", (req, res) => {
  res.send("Welcome to the Jobly API. The frontend is running separately.");
});

// Handle 404 errors -- this matches everything
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler; anything unhandled goes here.
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  
  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred.";

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;

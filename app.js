const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const usersRouter = require("./routes/usersRoutes");

const app = express();

// 1) Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware !!!");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from the server...");
});

//  3) Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", usersRouter);

// 4) Server

module.exports = app;

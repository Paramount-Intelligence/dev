const cors = require("cors");
const express = require("express");

const internRoutes = require("./routes/internRoutes");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/interns", internRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { errors } = require("celebrate");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const cardsRoute = require("./routes/cards.route");

const errorMiddleware = require("./middleware/error.middleware");

const {
  requestLogger,
  errorLogger,
} = require("./middleware/logger.middleware");

app.use(express.json());
app.use(requestLogger);

app.use(authRoute);
app.use("/users", userRoute);
app.use("/cards", cardsRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.use((req, res) => {
  res.status(404).send({ message: "A solicitação não foi encontrada" });
});

module.exports = app;

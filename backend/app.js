require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const { errors } = require("celebrate");
const cors = require("cors");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.route");
const cardsRoute = require("./routes/cards.route");

const errorMiddleware = require("./middleware/error.middleware");

const {
  requestLogger,
  errorLogger,
} = require("./middleware/logger.middleware");

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB de Produção/Dev");
  })
  .catch((err) => console.error("Erro ao conectar no banco:", err));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`O app está executando na porta ${PORT}`);
});

module.exports = app;

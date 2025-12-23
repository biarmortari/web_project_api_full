const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB de Produção/Dev");
    app.listen(PORT, () => {
      console.log(`O app está executando na porta ${PORT}`);
    });
  })
  .catch((err) => console.error("Erro ao conectar no banco:", err));

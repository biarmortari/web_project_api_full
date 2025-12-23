module.exports = (err, req, res, next) => {
  let { statusCode = 500, message = "Erro interno no servidor" } = err;

  if (err.name === "CastError") {
    statusCode = 400;
    message = "ID inválido";
  }

  if (err.name === "DocumentNotFoundError" || err.name === "NotFoundError") {
    statusCode = 404;
    message = "Usuário não encontrado";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Dados inválidos";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Este e-mail já está em uso";
  }

  res.status(statusCode).send({ message });
};

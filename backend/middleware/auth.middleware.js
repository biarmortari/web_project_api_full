const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("LOG: Header Authorization não chegou.");
    return res.status(401).send({ message: "Não autorizado: Header ausente" });
  }

  const token = authorization.replace(/Bearer\s+/i, "");

  try {
    if (!process.env.JWT_SECRET) {
      console.error(
        "LOG: A variável JWT_SECRET não foi encontrada no process.env!"
      );
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.log("LOG: Falha na verificação do Token:", err.message);
    return res.status(401).send({
      message: "Não autorizado",
      error: err.message,
    });
  }
};

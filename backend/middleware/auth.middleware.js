const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  /*console.log(req.headers.authorization, process.env.JWT_SECRET);*/
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("LOG: Header Authorization não chegou.");
    return res.status(401).send({ message: "Não autorizado: Header ausente" });
  }

  const token = authorization.replace("Bearer ", "");
  console.log(token);

  try {
    if (!process.env.JWT_SECRET) {
      console.error("LOG: JWT_SECRET não encontrado no process.env!");
    }

    /*const payload = jwt.verify(token, process.env.JWT_SECRET);*/
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

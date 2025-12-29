const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send({ message: "Não autorizado" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token);
  } catch (error) {
    return res.status(401).send({ message: "Não autorizado" });
  }

  req.user = payload;
  next();
};

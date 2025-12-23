const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).send({ message: "Não autorizado" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "hsaohjdos8y83h");
  } catch (error) {
    return res.status(401).send({ message: "Não autorizado" });
  }

  req.user = payload;
  next();
};

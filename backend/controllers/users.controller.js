const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/notFoundError");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Erro ao buscar usuário: ${err.message}` })
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .select("-password")
    .orFail()
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).send({
      message: "Usuário criado com sucesso",
      data: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("password")
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res
              .status(401)
              .send({ message: "Senha incorreta ou e-mail incorretos" });
          }

          const token = jwt.sign({ _id: user._id }, "hsaohjdos8y83h", {
            expiresIn: "2h",
          });

          return res.status(200).send({ token });
        })
        .catch(next);
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

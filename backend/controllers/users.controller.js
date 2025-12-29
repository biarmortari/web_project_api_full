const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const NotFoundError = require("../errors/notFoundError");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("Usuário não encontrado"))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .select("-password")
    .orFail(() => new NotFoundError("ID de usuário não encontrado"))
    .then((user) => res.send({ data: user }))
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
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuário não encontrado");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .send({ message: "Senha incorreta ou e-mail incorretos" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });

        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Usuário não encontrado"))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Usuário não encontrado"))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

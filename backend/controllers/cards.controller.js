const Card = require("../models/card.model");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: `Erro ao buscar cartões` }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Dados inválidos para criação do cartão" });
      }
      return res.status(500).send({ message: "Erro interno ao criar cartão" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Card não encontrado" });
      }
      return res
        .status(500)
        .send({ message: "Error interno ao deletar cartão" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Card não encontrado" });
      }
      return res
        .status(500)
        .send({ message: "Error interno ao curtir cartão" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID inválido" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Card não encontrado" });
      }
      return res
        .status(500)
        .send({ message: "Erro interno ao descurtir cartão" });
    });
};

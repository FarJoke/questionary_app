const bcrypt = require("bcryptjs");
const User = require("../models/user");
const BadRequestError = require("../errors/BadRequestError");
const { ConflictError } = require("../errors/ConflictError");

module.exports.createUser = (req, res, next) => {
  const {
    login,
    password,
    email,
    registrationDate,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        login,
        email,
        password: hash,
        registrationDate,
      })
    )
    .then((user) => {
      const { _id } = user;
      res.status(200).send({
        email,
        login,
        registrationDate,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Пользователь с таким email существует."));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Некорректные данные."));
        return;
      }
      next(err);
    });
};

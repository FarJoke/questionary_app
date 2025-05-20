const User = require("../models/user");
const path = require("path");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const { ConflictError } = require("../errors/ConflictError");

module.exports.updateUserInfo = (req, res, next) => {
  const { email, login, password} =
    req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      email,
      login,
      password
    },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        next(
          new NotFoundError(
            `Пользователь с указанным _id: ${req.user._id} не найден.`
          )
        );
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Пользователь с таким email существует."));
      }
      if (err.login === "ValidationError") {
        next(new BadRequestError("Некорректные данные."));
        return;
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(
          new NotFoundError(
            `Пользователь с указанным _id: ${req.user._id} не найден.`
          )
        );
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Некорректные данные."));
        return;
      }
      next(err);
    });
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Ошибка при получении информации о пользователе:", error);
    res.status(500).json({
      message: "Произошла ошибка при получении информации о пользователе",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    await User.findByIdAndDelete(userId);
    await Complaint.deleteMany({ user: userId });
    await Comment.deleteMany({ author: userId });

    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res
      .status(500)
      .json({ message: "Произошла ошибка при удалении пользователя" });
  }
};

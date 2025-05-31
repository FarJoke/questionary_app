const Answer = require("../models/answer");

module.exports.submitAnswers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers, isAnonymous } = req.body;

    const saved = await Answer.create({
      questionaryId: id,
      answers,
      isAnonymous,
    });

    res.status(201).send({ message: "Ответы сохранены", data: saved });
  } catch (err) {
    next(err);
  }
};

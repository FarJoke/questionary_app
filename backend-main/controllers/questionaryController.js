const Questionary = require("../models/questionary");

module.exports.createQuestionary = async (req, res, next) => {

    const {
      name,
      description,
      isAnonymous,
      hasTimeLimit,
      timeLimit,
      multipleAccess,
      hasEndDate,
      endDate,
      questions,
    } = req.body;
    const authorId = req.user._id;
    const newQuestionary = await Questionary.create({
      name,
      description,
      isAnonymous,
      hasTimeLimit,
      timeLimit,
      multipleAccess,
      hasEndDate,
      endDate,
      questions,
      author: authorId,
    });

    const link = `http://localhost:3000/quest?id=${newQuestionary._id}`;

    res.status(201).send({
      questionary: newQuestionary,
      link,
    });

};

module.exports.getQuestionariesByAuthor = async (req, res, next) => {
  try {
    const authorId = req.user._id;
    const questionaries = await Questionary.find({ author: authorId }).sort({ createdAt: -1 });

    res.send(questionaries);
  } catch (err) {
    next(err);
  }
};

module.exports.getQuestionaryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const questionary = await Questionary.findById(id);

    if (!questionary) {
      return res.status(404).send({ message: "Опрос не найден" });
    }

    res.send(questionary);
  } catch (err) {
    next(err);
  }
};

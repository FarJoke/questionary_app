const Answer = require("../models/answer");
const Questionary = require("../models/questionary");
const mongoose = require("mongoose");

module.exports.submitAnswers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers, isAnonymous } = req.body;

    // Преобразуем selectedVariants: оставляем только ID
    const normalizedAnswers = answers.map((ans) => ({
      ...ans,
      selectedVariants: (ans.selectedVariants || []).map((v) =>
        typeof v === 'object' && v !== null ? v.id : v
      ),
    }));

    const saved = await Answer.create({
      questionaryId: id,
      answers: normalizedAnswers,
      isAnonymous,
    });

    res.status(201).send({ message: 'Ответы сохранены', data: saved });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
module.exports.getQuestionaryResults = async (req, res) => {
  try {
    const { id } = req.params;

    // Проверим, существует ли анкета
    const questionary = await Questionary.findById(id).lean();
    if (!questionary) {
      return res.status(404).json({ error: "Анкета не найдена" });
    }

    // Агрегация: разворачиваем answers и группируем по questionNumber
    const results = await Answer.aggregate([
      { $match: { questionaryId: new mongoose.Types.ObjectId(id) } },
      { $unwind: "$answers" },
      {
        $group: {
          _id: "$answers.questionNumber",
          selectedVariants: { $push: "$answers.selectedVariants" },
          typedTexts: { $push: "$answers.typedText" },
          sliderValues: { $push: "$answers.sliderValue" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Добавим текст вопросов из анкеты
    const resultsWithQuestions = results.map((entry) => {
      const question = questionary.questions.find(
        (q) => q.number === entry._id
      );

      const variantCounts = {};

      // Подсчёт выбранных вариантов
      (entry.selectedVariants || []).flat().forEach((id) => {
        variantCounts[id] = (variantCounts[id] || 0) + 1;
      });

      // Подсчёт значений слайдера
      const sliderValueCounts = {};
      (entry.sliderValues || [])
        .filter((v) => typeof v === "number")
        .forEach((val) => {
          sliderValueCounts[val] = (sliderValueCounts[val] || 0) + 1;
        });

      return {
        number: entry._id,
        text: question?.text || "",
        type: question?.type || {},
        variants:
          question?.variants?.map((v) => ({
            ...v,
            count: variantCounts[v.id] || 0,
          })) || [],
        texts: (entry.typedTexts || []).filter(Boolean),
        sliderValues: Object.entries(sliderValueCounts).map(
          ([value, count]) => ({
            value: Number(value),
            count,
          })
        ),
      };
    });

    res.json({
      questionaryId: id,
      questions: resultsWithQuestions,
    });
  } catch (err) {
    console.error("Ошибка при получении результатов:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

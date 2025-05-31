const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionary",
    required: true,
  },
  answers: [
    {
      questionNumber: Number,
      selectedVariants: [Number], // ID выбранных вариантов
      typedText: String, // если есть открытый текст
      sliderValue: Number, // если вопрос с ползунком
    },
  ],
  isAnonymous: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Answer", AnswerSchema);
// models/Questionary.js
const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
  id: Number,
  text: String,
  checked: Boolean,
  dependsOnQuestionNumber: Number,
});

const QuestionSchema = new mongoose.Schema({
  number: Number,
  text: String,
  type: {
    id: Number,
    label: String,
  },
  isMultiple: Boolean,
  isLogic: Boolean,
  variants: [VariantSchema],
  sliderValue: Number,
  max: Number,
  step: Number,
  dependendByVariant: Number,
});

const QuestionarySchema = new mongoose.Schema({
  name: String,
  description: String,
  isAnonymous: Boolean,
  hasTimeLimit: Boolean,
  timeLimit: Date,
  multipleAccess: Boolean,
  hasEndDate: Boolean,
  endDate: Date,
  questions: [QuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("Questionary", QuestionarySchema);
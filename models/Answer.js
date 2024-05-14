const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  firstMetricAnswer: {
    type: Number,
    required: true,
  },
  secondMetricAnswer: {
    type: Number,
    required: true,
  },
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
});

const AnswerModel = mongoose.model("Answer", AnswerSchema);

module.exports = AnswerModel;

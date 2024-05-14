const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  surveyName: {
    type: String,
    required: true,
  },
  firstMetricName: {
    type: String,
    required: true,
  },
  firstMetricFrom: {
    type: Number,
    required: true,
  },
  firstMetricTo: {
    type: Number,
    required: true,
  },
  secondMetricName: {
    type: String,
    required: true,
  },
  secondMetricFrom: {
    type: Number,
    required: true,
  },
  secondMetricTo: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const SurveyModel = mongoose.model("Survey", SurveySchema);

module.exports = SurveyModel;

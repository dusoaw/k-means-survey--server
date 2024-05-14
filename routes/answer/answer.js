const AnswerModel = require("../../models/Answer");
const SurveyModel = require("../../models/Survey");

const submitAnswer = async (req, res) => {
  const { email, firstMetricAnswer, secondMetricAnswer, surveyId } = req.body;

  AnswerModel.create({
    email: email,
    firstMetricAnswer: firstMetricAnswer,
    secondMetricAnswer: secondMetricAnswer,
    survey: surveyId,
  })
    .then(() => {
      res.status(200).json();
    })
    .catch((error) => res.json(error));
};

const getAnswersBySurveyId = async (req, res) => {
  const userId = req.user.id;

  const { surveyId } = req.params;

  const survey = await SurveyModel.findOne({ _id: surveyId, user: userId });

  if (!survey) {
    return res.status(404).json({ message: "Survey not found" });
  }

  const answers = await AnswerModel.find({ survey: surveyId });

  if (answers) {
    res.status(200).json({ surveyName: survey.surveyName, answers: answers });
  } else {
    res.status(404).json({ message: "No answers found" });
  }
};

module.exports = {
  submitAnswer,
  getAnswersBySurveyId,
};

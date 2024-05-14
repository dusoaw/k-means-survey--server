const SurveyModel = require("../../models/Survey");

const createSurvey = async (req, res) => {
  const userId = req.user.id;

  const {
    surveyName,
    firstMetricName,
    firstMetricFrom,
    firstMetricTo,
    secondMetricName,
    secondMetricFrom,
    secondMetricTo,
  } = req.body;

  SurveyModel.create({
    surveyName: surveyName,
    firstMetricName: firstMetricName,
    firstMetricFrom: firstMetricFrom,
    firstMetricTo: firstMetricTo,
    secondMetricName: secondMetricName,
    secondMetricFrom: secondMetricFrom,
    secondMetricTo: secondMetricTo,
    user: userId,
  })
    .then((survey) => {
      res.status(200).json({ survey: survey });
    })
    .catch((error) => res.json(error));
};

const getAllSurveys = async (req, res) => {
  const userId = req.user.id;

  const surveys = await SurveyModel.find({ user: userId });

  if (surveys) {
    res.status(200).json({ surveys: surveys });
  } else {
    res.status(404).json({ message: "No surveys found" });
  }
};

const getSurveyById = async (req, res) => {
  const { surveyId } = req.params;

  const survey = await SurveyModel.findOne({ _id: surveyId });

  if (survey) {
    res.status(200).json({ survey: survey });
  } else {
    res.status(404).json({ message: "Survey not found" });
  }
};

const updateSurveyName = async (req, res) => {
  const userId = req.user.id;

  const { surveyId, surveyName } = req.body;
  const survey = await SurveyModel.findOne({ _id: surveyId, user: userId });

  if (survey) {
    survey.surveyName = surveyName;
    await survey.save();
    res.status(200).json({ message: "Survey name updated" });
  } else {
    res.status(404).json({ message: "Survey not found" });
  }
};

const deleteSurvey = async (req, res) => {
  const userId = req.user.id;

  const { surveyId } = req.params;
  SurveyModel.findOneAndDelete({ _id: surveyId, user: userId })
    .then(() => {
      res.status(200).json({ message: "Survey deleted" });
    })
    .catch((error) => res.json(error));
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  updateSurveyName,
  deleteSurvey,
};

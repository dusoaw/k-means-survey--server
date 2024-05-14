const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { DB_CONN } = require("./secrets");

const register = require("./routes/auth/register");
const login = require("./routes/auth/login");
const { cookieJwtAuth } = require("./middleware/cookieJwtAuth");
const {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  updateSurveyName,
  deleteSurvey,
} = require("./routes/survey/survey");
const {
  submitAnswer,
  getAnswersBySurveyId,
} = require("./routes/answer/answer");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(DB_CONN);

app.post("/api/auth/login", login);
app.post("/api/auth/register", register);

app.get("/api/surveys/:surveyId", getSurveyById);
app.get("/api/surveys", cookieJwtAuth, getAllSurveys);
app.post("/api/surveys", cookieJwtAuth, createSurvey);
app.put("/api/surveys", cookieJwtAuth, updateSurveyName);
app.delete("/api/surveys/:surveyId", cookieJwtAuth, deleteSurvey);

app.get("/api/answers/:surveyId", cookieJwtAuth, getAnswersBySurveyId);
app.post("/api/answers", submitAnswer);

app.listen(8080, () => {
  console.log("Server listening on port 8080");
});

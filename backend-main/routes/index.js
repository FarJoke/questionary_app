const router = require("express").Router();
const usersRouter = require("./user");


const { auth } = require("../middlewares/auth");
const NotFoundError = require("../errors/NotFoundError");
const { createUser } = require("../controllers/signUp");
const { login } = require("../controllers/signIn");
const { createQuestionary } = require("../controllers/questionaryController");
const { getQuestionariesByAuthor  } = require("../controllers/questionaryController");
const { getQuestionaryById } = require("../controllers/questionaryController");
const { submitAnswers } = require("../controllers/submitAnswers");
const { getQuestionaryResults } = require("../controllers/submitAnswers");

const { getUserById } = require("../controllers/user");
const {
  validateUserAuthentication,
  validateUserInfo,
} = require("../middlewares/userValidation");

const authMiddleware = require("../middlewares/auth");

router.post("/signup", createUser, validateUserInfo);
router.post("/signin", login, validateUserAuthentication);

router.get("/questionary/:id", getQuestionaryById);
router.post("/answers/:id", submitAnswers);
router.use(auth);

router.use("/users", usersRouter);
router.post("/questionary", createQuestionary);
router.use("/myquestionaries", getQuestionariesByAuthor);
router.get("/questionary/:id/results", getQuestionaryResults);
router.use("*", () => {
  throw new NotFoundError("Ресурс не найден.");
});

module.exports = router;

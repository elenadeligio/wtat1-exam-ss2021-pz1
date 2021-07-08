// #api_route - start
const router = require("express").Router(),
    questionsController = require("../controllers/questionsController");

router.get("/questions", questionsController.index, questionsController.filterUserQuestions,questionsController.respondJSON);
router.get("/questions/:id/vote", questionsController.vote, questionsController.respondJSON);
router.use(questionsController.errorJSON);

module.exports = router;
// #api_route - end
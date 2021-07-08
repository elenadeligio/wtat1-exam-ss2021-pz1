"use strict";

const router = require("express").Router(),
    questionsController = require("../controllers/questionsController");
// #index_draft
router.get("", questionsController.index, questionsController.indexView);
router.get("/new", questionsController.new);
router.post("/create", questionsController.create, questionsController.redirectView);
router.get("/:id/edit", questionsController.edit);
router.put("/:id/update", questionsController.update, questionsController.redirectView);
router.get("/:id", questionsController.show, questionsController.showView);
router.delete("/:id/delete", questionsController.delete, questionsController.redirectView);

module.exports = router;
"use strict";
// #index_draft
const Question = require("../models/question"),
    // #api_implementation - start
    httpStatus = require("http-status-codes"),
    User = require("../models/user"),
    // #api_implementation - end
    getQuestionParams = body => {
        return {
            title: body.title,
            text: body.text,
            date: body.date
        };
    };

module.exports = {
// #feature_controller - start
    index: (req, res, next) => {
        Question.find()
            .then(questions => {
                res.locals.questions = questions;
                next();
            })
            .catch(error => {
                console.log(`Error fetching questions: ${error.message}`);
                next(error);
            });
    },
    indexView: (req, res) => {
        res.render("questions/index");
    },
// #feature_controller - end
    new: (req, res) => {
        res.render("questions/new");
    },

    create: (req, res, next) => {
        let questionParams = getQuestionParams(req.body);
        Question.create(questionParams)
            .then(question => {
                res.locals.redirect = "/questions";
                res.locals.question = question;
                next();
            })
            .catch(error => {
                console.log(`Error saving questions: ${error.message}`);
                next(error);
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
    },

    show: (req, res, next) => {
        let questionId = req.params.id;
        Question.findById(questionId)
            .then(question => {
                res.locals.question = question;
                next();
            })
            .catch(error => {
                console.log(`Error fetching question by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("questions/show");
    },
// #second_action_controller - start
    edit: (req, res, next) => {
        let questionId = req.params.id;
        Question.findById(questionId)
            .then(question => {
                res.render("questions/edit", {
                    question: question
                });
            })
            .catch(error => {
                console.log(`Error fetching question by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let questionId = req.params.id,
            questionParams = getQuestionParams(req.body);

        Question.findByIdAndUpdate(questionId, {
            $set: questionParams
        })
            .then(question => {
                res.locals.redirect = `/questionss/${questionId}`;
                res.locals.question = question;
                next();
            })
            .catch(error => {
                console.log(`Error updating question by ID: ${error.message}`);
                next(error);
            });
    },
// #second_action_controller - end
    delete: (req, res, next) => {
        let questionId = req.params.id;
        Question.findByIdAndRemove(questionId)
            .then(() => {
                res.locals.redirect = "/questions";
                next();
            })
            .catch(error => {
                console.log(`Error deleting question by ID: ${error.message}`);
                next();
            });
    },
    // #api_implementation - start
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.OK,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },
    filterUserQuestions: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if (currentUser) {
            let mappedQuestions = res.locals.questions.map(question => {
                let userVoted = currentUser.questions.some(userQuestion => {
                    return userQuestion.equals(question._id);
                });
                return Object.assign(question.toObject(), { voted: userVoted });
            });
            res.locals.questions = mappedQuestions;
            next();
        } else {
            next();
        }
    },
    vote: (req, res, next) => {
        let questionId = req.params.id,
            currentUser = req.user;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    questions: questionId
                }
            })
                .then(() => {
                    res.locals.success = true;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    }
    // #api_implementation - end
};

"use strict";
// #seed_data - start
const mongoose = require("mongoose"),
    Question = require("./models/question");
mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/q_a",
    { useNewUrlParser: true, useFindAndModify: false }
);

Question.deleteMany({}).then(() => {
    return Question.create({
        title: "A",
        text: "Aaaaaaaa."
    });
}).then(question => console.log(question.title)).then(() => {
    return Question.create({
        title: "B",
        text: "Bbbbbb."
    });
}).then(question => console.log(question.title)).then(() => {
    return Question.create({
        title: "C",
        text: "Ccccccc."
    });
}).then(question => console.log(question.title)).catch(error => console.log(error.message)).then(() => {
    console.log("DONE");
    mongoose.connection.close();
});
// #seed_data - end
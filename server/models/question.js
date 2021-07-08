const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    // #mongoose_schema - start
    questionSchema = new Schema(
        {
            title: { //Require title and description
                type: String,
                required: true,
                unique: true
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    );
// #mongoose_schema - end
module.exports = mongoose.model("Question", questionSchema);
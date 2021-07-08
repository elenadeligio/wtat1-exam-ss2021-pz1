const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose"),

//#add_user_field - start
    userSchema = new Schema(
  {
      name: {
          first: {
              type: String,
              trim: true
          },
          last: {
              type: String,
              trim: true
          }
      },

    age: {
      type: Number,
      required: [true, 'age field is required'],
    },
      email: {
          type: String,
          required: true,
          lowercase: true,
          unique: true
      },
      password: {
          type: String,
          required: true
      },
    //#add_user_field - end

      // #association - start
        questions: [{ type: Schema.Types.ObjectId, ref: "Question" }]
      // #association - end
}
);

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});
userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);

"use strict";

const express = require("express"),
    layouts = require("express-ejs-layouts"),
    app = express(),
    router = require("./routes/index"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    connectFlash = require("connect-flash"),
    User = require("./models/user"); //for Passport

mongoose.connect(
    "mongodb://localhost:27017/q_a",
    { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);


app.set("port", process.env.PORT || 9000);
app.set("view engine", "ejs");


app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);


app.use(layouts);
app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.use(cookieParser("secretQa123"));
app.use(
    expressSession({
        secret: "secretQa123",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.flashMessages = req.flash();
    next();
});

app.use("/", router);

const server = app.listen(app.get("port"), () => {
console.log(`Server running at http://localhost:${app.get("port")}`);
}),
io = require("socket.io")(server),
chatController = require("./controllers/chatController")(io);

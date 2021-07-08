"use strict";

const router = require("express").Router(),
    userRoutes = require("./userRoutes"),
    questionRoutes = require("./questionRoutes"),
    errorRoutes = require("./errorRoutes"),
    homeRoutes = require("./homeRoutes"),
    apiRoutes = require("./apiRoutes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;

const express = require('express');

const {
  index
} = require('../controllers/user_controller');

const router = express.Router();

router
  .get('/', index)

module.exports = router;

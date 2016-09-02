var express = require('express');
var pollCtrl = require('../controllers/poll');
var router = express.Router();
var passport = require('passport');
var authMiddleware = require('../middlewares/auth');

router.route('/new')
    .all(authMiddleware.isLoggedIn)
    .get(pollCtrl.newPoll)
    .post(pollCtrl.createPoll);

module.exports = router;

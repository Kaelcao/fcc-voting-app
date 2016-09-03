var express = require('express');
var pollCtrl = require('../controllers/poll');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');

router.route('/new')
    .all(authMiddleware.isLoggedIn)
    .get(pollCtrl.newPoll)
    .post(pollCtrl.createPoll);

router.post('/custom',authMiddleware.isLoggedIn,pollCtrl.addCustomPoll);

router.route('/:id')
    .get(pollCtrl.getPoll)
    .post(pollCtrl.vote);


router.get("/:id/delete", authMiddleware.isLoggedIn, pollCtrl.delete);

module.exports = router;

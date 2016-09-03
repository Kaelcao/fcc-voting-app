var express = require('express');
var authCtrl = require('../controllers/auth');
var router = express.Router();
var passport = require('passport');
var homeCtrl = require('../controllers/home');
var authMiddleware = require('../middlewares/auth');

/* GET home page. */
router.get('/', homeCtrl.home);
router.get('/mypoll',authMiddleware.isLoggedIn,homeCtrl.myPoll);

router.route('/signup')
    .get(authCtrl.signUp)
    .post(authCtrl.createUser);

router.get('/signout',authCtrl.signOut);
router.get('/signin', authMiddleware.preventloggedUser, authCtrl.signIn);
router.route('/signin')
    .post(
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        })
    );
module.exports = router;

var User = require('../models/User');

module.exports = {
    signIn: function (req, res) {
        res.render('signin', {title: "Sign in", currentPage: 'signin'})
    },
    signUp: function (req, res) {
        res.render('signup', {title: "Sign up", currentPage: 'signup', signUpUser: {}});
    },
    createUser: function (req, res,next) {
        var errors = [];
        if (!req.body.email || !req.body.name || !req.body.password || !req.body.confirmPwd) {
            errors.push("All fields are required");
        }
        if (req.body.password && req.body.password != req.body.confirmPwd) {
            errors.push("Password and Confirm password are not match");
        }
        if (errors.length > 0) {
            res.render('signup', {
                title: "Sign up", currentPage: 'signup',
                errors: errors,
                signUpUser: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confirmPwd: req.body.confirmPwd
                }
            });
        } else {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = user.generateHash(req.body.password);

            user.save(function(err,user){
                if (err) return next(err);
                req.login(user, function(err) {
                    if (err) { return next(err); }
                    return res.redirect('/');
                });
            });

        }
    }
};

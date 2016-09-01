module.exports = {
    isLoggedIn: function (req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    },
    preventloggedUser: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/');
        }
        return next();
    }
};

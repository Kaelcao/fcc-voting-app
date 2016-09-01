module.exports = {
    home: function (req, res) {
        res.render('index',
            {
                title: 'All Polls | fcc-voting',
                currentPage: 'home',
                user: req.user
            });
    }
}
var Poll = require('../models/Poll');
module.exports = {
    home: function (req, res) {
        var polls = Poll
            .find()
            .sort({createdAt: -1})
            .exec(function (err, polls) {
                res.render('index',
                    {
                        title: 'All Polls | fcc-voting',
                        currentPage: 'home',
                        polls: polls,
                        user: req.user
                    });
            });

    }
}
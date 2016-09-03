var Poll = require('../models/Poll');
module.exports = {
    home: function (req, res) {
        Poll
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

    },
    myPoll: function (req, res) {
        Poll
            .find({userId: req.user.id})
            .sort({createdAt: -1})
            .exec(function (err, polls) {
                res.render('index',
                    {
                        title: 'My Polls | fcc-voting',
                        currentPage: 'mypolls',
                        polls: polls,
                        user: req.user
                    });
            });
    }
};
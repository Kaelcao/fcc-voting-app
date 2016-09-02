var Poll = require('../models/Poll');

module.exports = {
    newPoll: function (req, res) {
        var data = {
            currentPage: 'newpoll',
            title: 'Make a new Poll',
            user: req.user,
            poll: {}
        };
        var errors = req.flash('errors');
        var poll = req.flash('poll')[0];
        if (poll) {
            data.poll = poll;
        }
        if (errors) {
            data.errors = errors;
        }
        res.render('newpoll', data);
    },
    createPoll: function (req, res) {
        var errors = [];
        if (!req.body.title || !req.body.options) {
            errors.push("All fields are required");
        }
        var options = req.body.options.split(',');
        if (options.length < 2) {
            errors.push('You need 2 or more options to make a poll!');
        }
        if (errors.length > 0) {
            req.flash('errors', errors);
            req.flash('poll', {
                title: req.body.title,
                options: req.body.options
            });
            res.redirect('/poll/new');
        } else {
            var poll = new Poll();
            poll.title = req.body.title;
            poll.options = options;
            poll.save(function (err, poll) {
                if (err) throw (err);
                res.redirect('/poll/' + poll._id);
            });
        }
    }
};

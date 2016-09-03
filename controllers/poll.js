var Poll = require('../models/Poll');

module.exports = {
    addCustomPoll: function (req, res) {
        var custom = req.body.custom;
        var id = req.body.id;
        Poll.findById(id, function (err, poll) {
            if (err) throw(err);
            poll.votes.push(0);
            poll.options.push(custom);
            poll.save(function (err, poll) {
                if (err) throw(err);
                res.redirect('/poll/' + poll._id);
            });
        });
    },
    delete: function (req, res) {
        var id = req.params.id;
        Poll.findById(id).remove().exec(function (err) {
            if (err) throw(err);
            res.redirect('/');
        });
    },
    getPoll: function (req, res) {
        var id = req.params.id;
        var errors = req.flash('errors');
        Poll.findById(id, function (err, poll) {
            if (err) throw(err);
            res.render('poll', {poll: poll, title: poll.title, errors: errors, user: req.user});
        });
    },
    vote: function (req, res) {
        var options = req.body.options;
        var id = req.params.id;
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var errors = [];
        Poll.findById(id, function (err, poll) {
            if (err) throw(err);
            if (req.user) {
                if (poll.voters.indexOf(req.user._id) == -1) {
                    var value = poll.votes[poll.options.indexOf(options)] + 1;
                    poll.votes.set(poll.options.indexOf(options), value);
                    poll.voters.push(req.user._id);
                } else {
                    errors.push("You have voted for this poll(id)");
                }
            } else {
                if (poll.voters.indexOf(ip) == -1) {
                    var value = poll.votes[poll.options.indexOf(options)] + 1;
                    poll.votes.set(poll.options.indexOf(options), value);
                    poll.voters.push(ip);
                } else {
                    errors.push("You have voted for this poll(ip)");
                }
            }
            if (errors.length == 0) {
                poll.save(function (err, poll) {
                    if (err) throw(err);
                    console.log(poll);
                    res.redirect('/poll/' + poll._id);
                });
            } else {
                req.flash('errors', errors);
                res.redirect('/poll/' + poll._id);
            }

        });
    },
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
            poll.userId = req.user._id;
            poll.votes = new Array(poll.options.length + 1).join('0').split('').map(Number);
            poll.save(function (err, poll) {
                if (err) throw (err);
                res.redirect('/poll/' + poll._id);
            });
        }
    }
};

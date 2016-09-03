var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [String],
    votes: [Number],
    voters: [String],
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Poll', pollSchema);
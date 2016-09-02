var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    options: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Poll', pollSchema);
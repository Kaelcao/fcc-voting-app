var mongoose = require('mongoose');
var mongolabUri = process.env.MONGOLAB_URI;
mongoose.connect(mongolabUri);

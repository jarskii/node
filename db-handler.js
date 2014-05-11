var mongoose = require('mongoose'),
    config = require('./config/config_heroku');

mongoose.connect(config.db);

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error:', err.message);
});
db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

var User = new Schema({
    login: { type: String, required: true },
    pass: { type: String, required: true },
    session: { type: String, required: true },
    modified: { type: Date, default: Date.now },
    data: Schema.Types.Mixed
})

var Session = new Schema({
    session: { type: String, required: true },
    login: {type: String, required: true}
})

User.path('login').validate(function (v) {
    return v.length > 2 && v.length < 70;
});

User.statics.validateUser = function (name, cb) {
    this.find({ login: name}, cb);
}

UserModel = mongoose.model('User', User);
SessionModel = mongoose.model('Session', Session);

module.exports.UserModel = UserModel;
module.exports.connection = db;
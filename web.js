var express = require("express"),
    logfmt = require("logfmt"),
    config = require("./config/config_heroku"),
    fs = require('fs'),
    app = express(),
    db = require('./db-handler'),
    auth = require('./modules/auth.js'),
    mongoStore = require('connect-mongodb');

app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public/'));

app.use(express.session({
    secret: "VasVas",
    key: config.session.key,
    cookie: config.session.cookie
//    store: new mongoStore({mongoose_connection: db.connection})
}))

app.use(app.router);

//app.use("/ses", function(err, req, res, next) {
//    console.log(req.session);
////    req.session.val = req.session.val+1 || 1;
////
////    res.send(req.session.val);
//})


app.get("/sys", function(req, res) {
    req.session.val = req.session.val + 1 || 1;
//    console.log(req.session.se);
    res.send("vist: " + req.session.val);
})

app.get("/demo/lazyload", function(req, res) {
    app.use(express.static(__dirname + '/demo/'));

    fs.readFile('./demo/lazyload/index.html', function(err, data) {
        res.write(data);
        res.end();
    })
})

app.get("/demo/unusedstyles", function(req, res) {
    app.use(express.static(__dirname + '/demo/'));

    fs.readFile('./demo/unusedStyles/index.html', function(err, data) {
        res.write(data);
        res.end();
    })
})

//Модуль авторизации
auth.run(app, db);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
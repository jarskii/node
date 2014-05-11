var express = require("express"),
    logfmt = require("logfmt"),
    config = require("./config/config_heroku"),
    fs = require('fs'),
    app = express(),
    db = require('./db-handler'),
    auth = require('./modules/auth.js'),
    mongoStore = require('connect-mongodb');


app.set('views', __dirname + '/public/views');
app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(express.session({
    secret: "VasVas",
    key: config.session.key,
    cookie: config.session.cookie
}));

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/public/'));

app.use(app.router);

app.get("/demo/lazyload", function(req, res) {
    app.use(express.static(__dirname + '/demo/'));

    fs.readFile('./demo/lazyload/index.html', function(err, data) {
        res.write(data);
        res.end();
    })
})

app.get("/demo/unusedstyles", function(req, res) {
    if (!req.session.login) {
        res.redirect('/')
    } else {
        app.use(express.static(__dirname + '/demo/'));

        fs.readFile('./demo/unusedStyles/index.html', function(err, data) {
            res.write(data);
            res.end();
        })
    }
})

app.get("/demo/megalist", function(req, res) {
    app.use(express.static(__dirname + '/demo/'));

    fs.readFile('./demo/megalist/index.html', function(err, data) {
        res.write(data);
        res.end();
    })
})

app.get('/:login', function(req, res) {
    if (req.session.login) {
        res.render("user.jade", {
            login: req.session.login
        });
    } else {
        res.redirect('/');
    }

})

//Модуль авторизации
auth.run(app, db);

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
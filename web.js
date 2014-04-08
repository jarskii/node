var express = require("express"),
    logfmt = require("logfmt"),
    fs = require('fs'),
    app = express();


app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    fs.readFile('index.html', 'utf8', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

//app.engine('html', require('ejs').renderFile('index.html'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log("Listening on " + port);
});
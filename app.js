var http = require('http'),
    fs = require('fs'),
    json = require('./data.json'),
    net = require('net');

http.createServer(function(req, res) {
    res.writeHead('Content-type', 'text/html');
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (err) {
            res.write('not not not!')
        } else {
            res.write(data);
        }
    })
    socket.allowHalfOpen = true;
}).listen(8124);


var socket = net.createServer(function(conn) {

    conn.on('data', function(data) {

    })
    conn.on('close', function() {

    });

    conn.on('end', function() {

    })
}).listen(5000);


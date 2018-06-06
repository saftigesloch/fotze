var handler = require('express')();
var server  = require('http').createServer(handler)
var io = require('socket.io')(server);
var fs = require('fs');

server.listen(8080);
console.log("Running on http-port 8080...");

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function (socket) {
    console.log("--# client connected:", new Date());

    socket.on('device', function (msg) {
        console.log("  # dev. --> " + msg);

    });

    socket.on('disconnect', function () {
        console.log("--# client disconnected:", new Date());
    });
});

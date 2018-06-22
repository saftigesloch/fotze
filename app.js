var server  = require('http').createServer(handler)
var io = require('socket.io')(server);
var fs = require('fs');
var moment = require('moment');


server.listen(8080);




console.log("Running on http-port 8080...");
console.log( moment().minute()); 


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


io.on('connection', function (socket, username) {

        
        console.log("--# client connected:", new Date());
        io.emit('event message', "client connected: " + new Date());
        io.emit('notify message', "user connected");

        socket.on('device', function (msg) {
            console.log("  # dev. --> " + msg);
        });

        socket.on('cunt', function(username) {
            socket.username = username;
        });
    
        socket.on('chat message', function (msg) {
            console.log(socket.username + 'message: ' + msg);
            io.emit('cunt', socket.username);
            io.emit('chat message', msg);
        });

        socket.on('notify message', function (msg) {
            console.log('notify: ' + msg);
            io.emit('notify message', msg);
        });

        socket.on('disconnect', function () {
            console.log("--# client disconnected:", new Date());
            io.emit('event message', "client disconnected: " + new Date());
            io.emit('notify message', "user disconnected");
        });
    });

var server  = require('http').createServer(handler)
var io = require('socket.io')(server);
var fs = require('fs');
var moment = require('moment');
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

            


        console.log("--# client connected !26:", new Date());
        io.emit('event message', " client connected !27: " + new Date());
        
        console.log('notify message', socket.username + " connected !29");
        

        

        socket.on('device', function (msg) {
            console.log(" !35 # dev. --> " + msg);
        });

        socket.on('cunt', function(username) {
            socket.username = username;
            
            });

        socket.on('chat message', function (msg) {
            console.log(socket.username + ' ->: ' + msg);
            io.emit('cunt', socket.username);
            io.emit('chat message', msg);
        });

        socket.on('notify message', function (msg) {
            console.log('notify: !50' + msg);
            io.emit('notify message', msg);
        });

        socket.on('disconnect', function () {
            console.log("--# client disconnected !54:", new Date());
            io.emit('event message', "client disconnected: " + new Date());
            io.emit('notify message', "User " + socket.username + " disconnected");
            console.log('notify message', "User " + socket.username + " disconnected !58");
        });
    });




// 06/25/18

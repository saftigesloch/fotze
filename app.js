var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

console.log("Fotze is Running on http-port 8080...");



function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function(socket){
  console.log( new Date(), 'Schwanz connected');
  socket.on('disconnect', function(){
    console.log( new Date(),'Schwanz disconnected');
  });
});


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var postbacks = require("./postbacks.js");
var count = 0;

var hps=[],wps=[],ips=[],cps=[];
var cur_second;

app.get('/ld/', function(req, res){
  res.sendfile('index.html');
});

app.get('/ld/index.css', function(req, res){
  res.sendfile('index.css');
});
    
app.get('/health', function(req, res){
  res.send('healthy\n');
});

setInterval(function(){
   cur_second = Date.now()/1000|0;
}, 1000);

for (var key in postbacks.events) {
    app.get('/ld/'+key, function(req, res){
        var second = Date.now()/1000|0;
        postbacks.events[key][second] = postbacks.events[key][second]+1 || 1;
        res.status(204).end();
    });
    setInterval(function(){
        io.emit(key, postbacks.events[key][cur_second-1] || 0);
        postbacks.events[key].splice(cur_second-10, 1);
    }, 1000);
}

http.listen(8080, function(){
  console.log('listening on *:8080');
});

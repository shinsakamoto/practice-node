var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request',function(req,res){
	fs.readFile(__dirname + '/public_test/blog/new.html','utf-8',function(err,data){
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(data);
		res.end();
		return
	});
});
server.listen(3001,'localhost');
console.log('server listening ...');

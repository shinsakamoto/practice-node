var http = require('http'),
fs = require('fs'),
setting = require('./setting');

console.log(setting);

var server = http.createServer();
server.on('request',function(req,res){
	fs.readFile(__dirname + '/public_html/hello.html','utf-8',function(err,data){
		if(err){
				res.writeHead(404, {'Content-Type':'text/plain'});
			res.write('not found');
				return res.end();
		}
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write(data);
		res.end();
		return
	});
});

server.listen(setting.port,setting.host);
console.log('server listening ...');

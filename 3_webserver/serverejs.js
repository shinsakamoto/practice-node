var http = require('http'),
fs = require('fs'),
ejs = require('ejs'),
setting = require('./setting'),
template = fs.readFileSync(__dirname + '/public_html/hello.ejs','utf-8'),
n = 0;

console.log(setting);

var server = http.createServer();
server.on('request',function(req,res){
	n++;
	var data = ejs.render(template,{
		title:'hello',
		content:"<strong>world</strong>",
		n:n
	});
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(data);
	res.end();
	return
});

server.listen(setting.port,setting.host);
console.log('server listening ...');

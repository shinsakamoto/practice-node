var http = require('http'),
fs = require('fs'),
setting = require('./setting');

console.log(setting);

var server = http.createServer();
server.on('request',function(req,res){

	var msg;
	res.writeHead(200, {'Content-Type':'text/plan'});
switch (req.url) {
	case '/blog':
	msg = 'blog';
	break;
	case '/about':
		msg = 'about this page'
		break;
	case '/profile':
	msg = 'about me'
break;
	default:
	msg = 'No contents..'
		break;
}
	res.write(msg);
	res.end();
})

server.listen(setting.port,setting.host);
console.log('server listening ...');

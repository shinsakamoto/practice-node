var http = require('http'),
fs = require('fs'),
ejs = require('ejs'),
qs = require('querystring'),
setting = require('./setting'),
template = fs.readFileSync(__dirname + '/public_html/bbs.ejs','utf-8'),
posts = [];

console.log(setting);

function renderHTML(posts , res){
	var data = ejs.render(template , {
		posts : posts,
	});
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write(data);
	res.end();
	return
}

var server = http.createServer();
server.on('request',function(req,res){
	if(req.method === 'POST'){
		req.data = "";
		req.on("readable", function(){
			var temp=req.read();
			if(temp!=null){
				req.data +=temp;
			}
		});
		req.on("end", function(){
				var query = qs.parse(req.data);
				console.log(query);
				posts.push(query.name);
				renderHTML(posts,res);
		});
	}else{
		renderHTML(posts , res);
	}
});

server.listen(setting.port,setting.host);
console.log('server listening ...');

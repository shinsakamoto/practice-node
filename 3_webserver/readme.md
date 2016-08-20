# 簡単なWebサーバーの作成

## httpモジュールを使ったWebサーバー
```javascript
var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.write('hello world');
	res.end();
});
server.listen(8080,'localhost');
```

## 外部ファイルの使い方
setting.js
```javascript
exports.port = 1337;
exports.host = 'localhost';
```
server.js
```javascript
var setting = require('./setting');
server.listen(setting.port,setting.host);
```

## req.urlを使ったルーティング
```javascript
server.on('request',function(req,res){
	res.writeHead(200, {'Content-Type':'text/plain'});
		switch (req.url) {
			case '/blog':
				res.write('blog page');
				break;
			case '/about':
				res.write('about me page');
				break;
			case '/profile':
				res.write('profile page');
				break;
			default:
				break;
		}
	res.end();
});
```


## fsモジュールを使ったファイルの読み込み
```javascript
var fs = require('fs');
```
```javascript
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
```
/public_html/hello.html
```html
<html>
<h1>hello</h1>
</html>
```

## ejsモジュールを使ったテンプレートの使い方
```javascript
var fs = require('fs');
var ejs = require('ejs');
var template = fs.readFileSync(__dirname + '/public_html/hello.ejs','utf-8');
var n=0;
```

```javascript
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
```
/public_html/hello.ejs
```html
<html>
<h1><%= title %></h1>
<p><%- content %></p>
<p><%= n %> views </p>
</html>
```

## querystringモジュールを使ってPOSTデータを取得する
```javascript
var qs = require('querystring');
```
```javascript
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
				// render HTML for POST
		});
	}else{
		// render HTML for GET
	}
});
```

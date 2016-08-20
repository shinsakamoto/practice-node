# Expressを使ったWebサーバーの作成

## expressのインストール
```
sudo npm install -g express
```

## expressコマンド
```
$ express -h
```
```
  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

## nodeamonのインストール
```
sudo npm install -g nodemon
```
ファイル更新時に再起動してくれる
```
nodemon app.js
```

## ルーティング
```javascript
var express = require('express');
app = express();
app.get('/',function(req,res){
	res.send('welcome page');
});
app.get('/about',function(req,res){
	res.send('about page');
});
```

## URLの一部を処理に使う
:を使って定義する。?を指定すると、パラメーターが無い場合を許容する。
```javascript
app.get('/users/:name?',function(req,res){
	if(req.params.name){
		res.send('hello,' + req.params.name);
	}else{
		res.send('who are you ?');
	}
});
```
正規表現で指定する
```javascript
app.get('/items/:id([0-9]+)?',function(req,res){
	if(req.params.id){
		res.send('id is ' + req.params.id);
	}else{
		res.send('No id...');
	}
});
```

## 静的ファイルのルーティング
 - express.staticを使う

```javascript
app.use(express.static(__dirname + '/public'));
```
 - sendfileを使う

```javascript
app.get('/download/app.zip',function(req,res){
	res.sendfile(__dirname + '/download/app.zip');
});
```

## middleware
```javascript
var logger = require('morgan');
app = express();
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
	console.log('custom middleware')
	next();
});
```

# app.param
URLのパラメーター取得時の共通処理
```javascript
app.param('id',function(req,res,next,id){
	console.log('id param ' + id);
	var users = {100:'A',200:'B',300:'C'};
	req.params.name = users[id];
	next();
});
app.get('/manage/:id([0-9]+)?',function(req,res){
	if(req.params.id){
		res.send('name is ' + req.params.name + ' id is ' + req.params.id );
	}else{
		res.send('No id...');
	}
});
```

## body-parserモジュールを使ってPOSTデータを取得する
```
npm install body-parser
```
```javascript
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/add',function(req,res){
	res.send(req.body.name);
});
```

public_modules/post.html
```html
<!DOCTYPE html>
<html lang="ja">
<head>
	<title>POST</title>
	<meta charset="utf-8">
</head>
<body>
<form method="post" action="add">
	<input type="text" name="name">
	<button type='submit' name='action' value='send'>Post</button>
</body>
</html>
```

## ejsを使ったテンプレート
```
npm install ejs
```
```javascript
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/',function(req,res){
	res.render('index',{title:'Welcome',message:'Welcome !!'});
});
```
views/index.ejs
```html
<!DOCTYPE html>
<html lang="ja">
<head>
	<title><%=title%></title>
	<meta charset="utf-8">
</head>
<body>
<h1><%=message%><h1>
</body>
</html>
```

## PUT,ELETEを使う（REST APIの実装）
参考：
http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/

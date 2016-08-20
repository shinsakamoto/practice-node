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
ファイル更新時に再起動してくれるはずだが、、動いていないような？
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
### ejsでinclude関数を使う
```
<%- include('../header' , {title:'Edit Article'}) %>
```

## PUT,DELETEを使う（REST APIの実装）
参考：
http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/

### enable PUT & DELETE method
```
npm install method-override
npm install body-parser
```
app.js
```javascript
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
```
```javascript
// support PUT & DELETE method form browser
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
```
blog/edit.ejs
```html
<form method="post" action="/blog/<%=article.id%>">
	<div>Title: <input type="text" name="title" value="<%=article.title%>"></div>
	<div>Content: <br/><textarea cols="100" rows="20" name="content" ><%=article.content%></textarea></div>
	<button type='submit' name='action' value='send'>Save</button>
	<input type="hidden" name="_method" value="put">
	<input type="hidden" name="id" value="<%=article.id%>">
</form>
```
blog/showAll.ejs
```html
<form method="post" action="/blog/<%=articles[i].id%>">
	<button type='submit' name='action' value='delete'>Delete</button>
	<input type="hidden" name="_method" value="delete">
	<input type="hidden" name="id" value="<%=articles[i].id%>">
</form>
```
### routing
app.js
```javascript
// blog service routing
app.get('/blog/', blog.showAll);
app.get('/blog/new', blog.new);
app.post('/blog/create', blog.create);
app.get('/blog/:id/edit', blog.editById);
app.get('/blog/:id', blog.showById);
app.put('/blog/:id', blog.update);
app.delete('/blog/:id', blog.delete);
```
### implementation
routes/blog.js
```javascript
exports.showAll = function(req,res){
	console.log('showAll page');
	res.send('showAll page');
};
exports.showById = function(req,res){
	console.log('showById page');
	res.send('showById page');
};
exports.new = function(req,res){
	console.log('new page');
	res.send('new page');
};
exports.create = function(req,res){
	console.log('create page');
	res.send('create page');
};
exports.update = function(req,res){
	console.log('update page');
	res.send('update page');
};
exports.editById = function(req,res){
	console.log('editById page');
	res.send('editById page');
};
exports.delete = function(req,res){
	console.log('delete page');
	res.send('delete page');
};
```

## CSRF対策
 - 参考:https://github.com/expressjs/csurf
 - TestApp:app_test.js
```
npm install cookie-parser
npm install csurf
```
app.js
```javascript
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var csrf = require('csurf')
```
```javascript
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))
```
```javascript
// error handler
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  // handle CSRF token errors here
  res.status(403)
  res.send('form tampered with')
})
```
routes/blog.js
```javascript
res.render('blog/edit',{csrfToken: req.csrfToken(),article:article});
```
edit.ejs etc...
```html
	<input type="hidden" name="_csrf" value="<%=csrfToken%>">
```

## エラー処理
app.js
```javascript
// error handler for blog
app.use(blog.errorHandler);
```
routes/blog.js
```javascript
var ERROR_NOT_FOUND = new Error('Not found Article');
ERROR_NOT_FOUND.code = 'ERROR_NOT_FOUND';
var ERROR_FAIL_UPDATE = new Error('Fail update Article');
ERROR_FAIL_UPDATE.code = 'ERROR_FAIL_UPDATE';
```
```javascript
exports.update = function(req,res,next){
	// ...
	if(updateArticle(article)){
		res.redirect('/blog/' + article.id);
	}else{
		next(ERROR_FAIL_UPDATE);
	}
};
```
```javascript
exports.errorHandler = function (err, req, res, next) {
	console.log(err);
	switch (err.code) {
		case 'ERROR_NOT_FOUND':
			res.status(403)
			res.render('blog/error',{message:err.message});
			break;
		case 'ERROR_FAIL_UPDATE':
			res.status(403)
			res.render('blog/error',{message:err.message});
			break;
		default:
			next(err);
			break;
	}
};
```

var express = require('express');
var logger = require('morgan');
app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
	console.log('custom middleware')
	next();
});

app.get('/',function(req,res){
	res.send('welcome page');
});

app.get('/about',function(req,res){
	res.send('about page');
});

app.get('/users/:name?',function(req,res){
	if(req.params.name){
		res.send('hello,' + req.params.name);
	}else{
		res.send('who are you ?');
	}
});

app.get('/items/:id([0-9]+)?',function(req,res){
	if(req.params.id){
		res.send('id is ' + req.params.id);
	}else{
		res.send('No id...');
	}
});

app.get('/download/app.zip',function(req,res){
	res.sendfile(__dirname + '/download/app.zip');
});

app.listen(3000);
console.log('server started ...')

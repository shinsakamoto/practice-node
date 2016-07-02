var express = require('express');
var logger = require('morgan');
app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
console.log('my custom middleware2')
	next();
});


app.get('/download',function(req,res){
res.sendfile(__dirname + '/download/app.zip');
});


app.get('/',function(req,res){
res.send('hello world');
});

app.get('/about',function(req,res){
res.send('about this page');
});

app.get('/users/:name?',function(req,res){
if(req.params.name){
res.send('hello,' + req.params.name);
}else{
	res.send('who ?');
}
});

app.get('/items/:id([0-9]+)?',function(req,res){
res.send('item no: ' + req.params.id);
});

app.listen(3000);
console.log('server listening ...')

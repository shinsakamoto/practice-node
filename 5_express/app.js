var express = require('express');
var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var blog = require('./routes/blog');



app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
	console.log('custom middleware')
	next();
});
// support PUT & DELETE method form browser
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

// blog service routing
app.get('/blog/', blog.showAll);
app.get('/blog/new', blog.new);
app.post('/blog/create', blog.create);
app.get('/blog/:id/edit', blog.editById);
app.get('/blog/:id', blog.showById);
app.put('/blog/:id', blog.update);
app.delete('/blog/:id', blog.delete);

// post sample
app.post('/add',function(req,res){
	res.send(req.body.name);
});

// ejs sample
app.get('/',function(req,res){
	res.render('index',{title:'Welcome',message:'Welcome !!'});
});

// routing sample
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

app.get('/download/app.zip',function(req,res){
	res.sendfile(__dirname + '/download/app.zip');
});

// server start
app.listen(3000);
console.log('server started ...')

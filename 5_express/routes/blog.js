articles = [
	{id:'1', title:'hello node.js', content:'install node and npm'},
	{id:'2', title:'hello Express', content:'npm install express'},
	{id:'3', title:'hello ejs', content:'npm install ejs'}
]

function findArticle(id){
	console.log('finding ' + id + '...');
	return articles.find(function(item){
		console.log('  check ');
		console.log(item);
		return item.id === id}
	);
}

function createArticle(article){
	console.log('create new article ...' + article);
	article.id = String(articles.length + 1);
	articles.push(article);
}

function updateArticle(article){
	console.log('update article ...' + article);
	var oldArticle = findArticle(article.id);
	if(oldArticle===undefined){
		return false;
	}
	oldArticle.title = article.title;
	oldArticle.content = article.content;
	return true;
}

function deleteArticle(id){
	console.log('delete article ...' + id);
	var no=-1;
	for( var i=0 ; i < articles.length ; i++){
		if(articles[i].id === id){
			no=i;
			break;
		}
	}
	if(no<0){
		return false
	}else{
		articles.splice(no,1);
		return true;
	}
}

exports.showAll = function(req,res){
	console.log('showAll page');
	res.render('blog/showAll',{articles:articles});
};

exports.showById = function(req,res){
	console.log('showById page');
	//res.send('showById page');
	var id = req.params.id;
	var article = findArticle(id);
	if(article === undefined){
		res.render('blog/notfound');
	}else{
		console.log(article);
		res.render('blog/showById',{article:article});
	}
};

exports.new = function(req,res){
	console.log('new page');
	res.render('blog/new');
	//res.send('new page');
};

exports.create = function(req,res){
	console.log('create page');
	//res.send('create page');
	var article = {
		title:req.body.title,
		content:req.body.content
	};
	createArticle(article);
	res.redirect('/blog');
};

exports.update = function(req,res){
	console.log('update page');
	//res.send('update page');
	var article = {
		id:req.params.id ,
		title:req.body.title ,
		content:req.body.content
	};
	if(updateArticle(article)){
		res.redirect('/blog/' + article.id);
	}else{
		res.render('blog/notfound');
	}
};

exports.editById = function(req,res){
	console.log('editById page');
	//res.send('editById page');
	var id = req.params.id;
	var article = findArticle(id);
	if(article === undefined){
		res.render('blog/notfound');
	}else{
		console.log(article);
		res.render('blog/edit',{article:article});
	}
};

exports.delete = function(req,res){
	console.log('delete page');
	//res.send('delete page');
	if(deleteArticle(req.body.id)){
		res.redirect('/blog');
	}else{
		res.render('blog/notfound');
	}

};

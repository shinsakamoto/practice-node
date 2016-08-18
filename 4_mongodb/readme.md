# mongodbモジュール
```sh
npm install mongodb
```
# mongodbのインストール
mongoコマンドが実行できること  
Macへのインストール例
```
brew update
brew install mongodb
sudo mkdir -p /data/db
sudo chown -R $(whoami):admin /data/db
mongo
```

# mongodbへの接続
 - host : localhost
 - db name : nodedb

```javascript
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/nodedb",
	function(err,db){
		if(err){return console.dir(err);}
		console.log("connected");
	});
```
# mongodb insert
```javascript
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/nodedb",
	function(err,db){
		if(err){return console.dir(err);}
		console.log("connected");
		db.collection("users",function(err,collection){
			var docs = [
				{name: "a", score: 40},
				{name: "b", score: 80},
				{name: "c", score: 60}];
				collection.insert(docs,function(err,result){
					console.dir(result);
				});
		});
	});
```

# mongodb insert
```javascript
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/nodedb",
	function(err,db){
		if(err){return console.dir(err);}
		console.log("connected");
		db.collection("users",function(err,collection){
			var docs = [
				{name: "a", score: 40},
				{name: "b", score: 80},
				{name: "c", score: 60}];
				collection.insert(docs,function(err,result){
					console.dir(result);
				});
		});
	});
```

# mongodb stream を使ったfind
```javascript
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost/nodedb",
	function(err,db){
		if(err){return console.dir(err);}
		console.log("connected");
		var stream = collection.find().stream();
		stream.on("data",function(item){
			console.log(item);
		})
		stream.on("end",function(){
			console.log("finished");
		});
	});
```

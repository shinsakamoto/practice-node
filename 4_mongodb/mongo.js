var MongoClient = require('mongodb').MongoClient,
setting = require('./setting');
MongoClient.connect("mongodb://" + setting.host+"/"+setting.db,
function(err,db){
	if(err){return console.dir(err);}
	console.log("connected to db");
	db.collection("users",function(err,collection){
		//if(err){return console.log("collection err")}
		var docs = [
			{name: "a", score: 40},
			{name: "b", score: 80},
			{name: "c", score: 60}];
			// collection.insert(docs,function(err,result){
			// 	console.dir(result);
			// });

			// collection.find({name:"a"}).toArray(
			// 	function(err,items){
			// 		console.log(items)
			// 	});
			var stream = collection.find().stream();
			stream.on("data",function(item){
				console.log(item);
			})
			stream.on("end",function(){
				console.log("finished");
			});


		});
	});

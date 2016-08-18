function heavyTask(sec , msg){
	var start = new Date().getTime();
	while(new Date().getTime() < start + (sec * 1000));
	console.log(msg);
}

console.log("1.");

// non blocking
setTimeout(function(){heavyTask(1,'6.');},1000);

console.log("2.");

// non blocking
setTimeout(function(){heavyTask(1,'8.');},1001);

// non blocking
console.log("3.");

// non blocking
setTimeout(function(){heavyTask(1,'7.');},1000);

// blocking
heavyTask(1,'4.');

console.log("5.");

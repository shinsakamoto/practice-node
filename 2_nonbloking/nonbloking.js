console.log("non bloking");

setTimeout(function(){
	console.log("4. hello");
},1000);
console.log("1. world");

console.log("2. bloking");
var start = new Date().getTime();
while(new Date().getTime() < start + 2000);
console.log("3. hello world");

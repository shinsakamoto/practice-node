# non blocking , blockingの例
blocking
```javascript
var start = new Date().getTime();
while(new Date().getTime() < start + (sec * 1000));
console.log(msg);
```
non blocking
```javascript
setTimeout(function(){heavyTask();},1000);
```

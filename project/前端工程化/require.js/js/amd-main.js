
define(['inc-cmd'],function(Inc){
	console.log(Inc.get());
	Inc.inc();
	console.log(Inc.get());
	Inc.inc();
	console.log(Inc.get());

})
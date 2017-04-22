
// (function(name,definition,context){
// 	if (typeof module!= 'undefined' && module.exports) {
// 		//在CMD规范下（node）
// 		module.exports =definition();
// 	}else if (typeof context['define'] == 'function' && (context['define']['amd'] || context['define'])) {
// 		//在AMD规范下（RequireJS） 或CMD下（SeaJS）
// 		define(definition);
// 	}else{
// 		//在浏览器环境下
// 		context[name] =definition();
// 	}
	
// })('Inc',function(){
// 	var inc =(function(){
// 		'use strict';
// 		var a= 1;
// 		function inc(){
// 			a++;
// 		}
// 		function get(){
// 			return a;
// 		}
// 		return {
// 			inc: inc,
// 			get: get
// 		}
// 	})();

// 	return inc;

// },this);


define(function(){
	var inc =(function(){
		var a= 1;
		function inc(){
			a++;
		}
		function get(){
			return a;
		}
		return {
			inc: inc,
			get: get
		}	
	})();
	return inc;
})
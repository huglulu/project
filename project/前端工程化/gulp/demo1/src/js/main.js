requirejs.config({
	base:'./src/js',
	path:{
		'jquery':'lib/bower_components/jquery/dist/jquery.min'
	}
	// ,
	// shim:{
	// 	's':{
	// 			exports:'jQuery'
	// 	}
	// }	
});
	//加载入口模块
	requirejs(['app/index']);

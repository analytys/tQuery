// @link : http://blog.sina.com.cn/s/blog_5380a47901014mid.html
if(process.platform == 'win32')
{
	var runner = require("C:\\Users\\tocky\\node_modules\\qunit");
	var basePath = "D:\\Project\\tQuery\\Resources\\module\\base\\" ;
	var apiPath = "D:\\Project\\tQuery\\Resources\\module\\api\\" ;
	var resourcePath = "D:\\Project\\tQuery\\Resources\\" ;
}
else
{
	var runner = require("/usr/local/nodejs/node_modules/qunit");
	var resourcePath = "/home/tocky/Data/JS/tQuery/Resources/" ;

	var basePath = resourcePath  + "module/base/";
	var apiPath = resourcePath  + "module/api/";
}

 

runner.run([
            {
			  code : basePath + 'type.js',
			  tests : './type.js'
			},
			{
				  code : basePath + 'trim.js',
				  tests : './trim.js'
			},
			{
				  code : basePath + 'merge.js',
				  tests : './merge.js'
			},
			{
			    code : basePath + 'isObject.js',
			    tests : './isObject.js',
			},
			{
			    code : basePath + 'isArray.js',
			    tests : './isArray.js',
			},
			{
				  code : basePath + 'style.js',
				  tests : './style.js'
			},
			{
				  code : basePath + 'getMulitClass.js',
				  tests : './getMulitClass.js'
			},
			{
				  code : basePath + 'isNumber.js',
				  tests : './isNumber.js'
			},
			{
				  code : basePath + 'unique.js',
				  tests : './unique.js'
			},
			{
				  code : basePath + 'intersection.js',
				  tests : './intersection.js'
			},
			{
				code : resourcePath + "tQuery.js" ,
				tests : "./tQuery.js"
			},
		] , function(err, report) {
	        	console.dir(report);
	    });


// 命名空间有冲突
//runner.run({
//    code : apiPath + 'console.js',
//    tests : './console.js',
//});






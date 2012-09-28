// @link : http://blog.sina.com.cn/s/blog_5380a47901014mid.html

//var process = process || { platform : "win32" }  ;
if( process.platform == 'win32')
{
	var runner = require("C:\\Users\\tocky\\node_modules\\qunit");
	var basePath = "D:\\Project\\tQuery\\Resources\\module\\base\\" ;
	var apiPath = "D:\\Project\\tQuery\\Resources\\module\\api\\" ;
	var resourcePath = "D:\\Project\\tQuery\\Resources\\" ;
	var testPath = "D:\\Project\\tQuery\\Resources\\test\\";
}
else
{
	var runner = require("/usr/local/nodejs/node_modules/qunit");
	var resourcePath = "/home/tocky/Data/JS/tQuery/Resources/" ;

	var basePath = resourcePath  + "module/base/";
	var apiPath = resourcePath  + "module/api/";
	var testPath = resourcePath  + "test/";
}


runner.run([
            	{ 
            		deps : testPath + "ti.js" ,
            		code : resourcePath + "tQuery.js" ,
            		tests : [testPath + "tQuery_function.js" /* , testPath + "tQuery_method.js" */ ] ,
            	}
           ]	, function(err, report) {
 					console.dir(report);
				}
);

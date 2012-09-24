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

runner.run({
  code : basePath + 'type.js',
  tests : './type.js'
});

runner.run({
  code : basePath + 'trim.js',
  tests : './trim.js'
});

runner.run({
  code : basePath + 'merge.js',
  tests : './merge.js'
});
runner.run({
    code : basePath + 'isObject.js',
    tests : './isObject.js',
});

runner.run({
    code : basePath + 'isArray.js',
    tests : './isArray.js',
});

// 命名空间有冲突
//runner.run({
//    code : apiPath + 'console.js',
//    tests : './console.js',
//});


runner.run({
  code : basePath + 'style.js',
  tests : './style.js'
});

runner.run({
  code : basePath + 'getMulitClass.js',
  tests : './getMulitClass.js'
});

runner.run({
  code : basePath + 'isNumber.js',
  tests : './isNumber.js'
});


/* test tQuery */
runner.run({
	code : resourcePath + "tQuery.js" ,
	tests : "./tQuery.js"
});




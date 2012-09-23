// @link : http://blog.sina.com.cn/s/blog_5380a47901014mid.html

var runner = require("C:\\Users\\tocky\\node_modules\\qunit");

var basePath = "D:\\Project\\tQuery\\Resources\\module\\base\\" ;

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

runner.run({
  deps : [basePath + "type.js" , basePath + "merge.js" , basePath + "trim.js" ],
  code : basePath + 'style.js',
  tests : './style.js'
});




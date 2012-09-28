(function(global){
     global.tQuery = global.$ = tQuery = $ = require("./tQuery").tQuery ; 
})(this);

$.memoryMonitor();

$.supportMonitor();

// $.loadStyle();// console.log( $.css );
// var MainWindow = $({type:"Window", id : "main" ,  title : "tQuery framework" , fullScreen : true , backgroundColor : "#fff000" }).open() ;


// MainWindow.attr("backgroundColor" , "#000000"); // ti支持直接设置属性，改变对象的属性
// 
// $("#main").attr("backgroundColor" , "#ff0000"); 

// MainWindow.attr("title" , "change title");
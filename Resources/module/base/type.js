/* 测试变量的类型
 * @param 任意类型
 * @return {String} 
 */
exports.type = function(obj)
{
    switch(obj)
    {  
        case null:  
            return "null";  
        case undefined:  
            return "undefined";  
    }  

    var s=Object.prototype.toString.call(obj);  
    switch(s)
    {  
       case "[object String]":  
           return "string";  
       case "[object Number]":
           return isNaN(obj) ? "NaN" : ( -1 != new String(obj).indexOf(".") ? "float" : "number" );  
       case "[object Boolean]":  
           return "boolean";  
       case "[object Array]":  
           return "array";  
       case "[object Date]":  
           return "date";  
       case "[object Function]":  
           return "function";  
       case "[object RegExp]":  
           return "regExp";  
       case "[object Object]":  
           return "object";  
       default:
           return s ;  
   }
}  
var type = require("./type").type ;
var clone = require("./clone").clone ;

/**
 * 将n的属性复制给o
 * @param {Object} o 
 * @param {Object} n
 * @return {Object} 
 */
exports.merge = function(o,n)
{
    /**DEBUG{{**/
    if( type( o ) !== "object" || type( n ) !== "object")
    {
        console.log(  "debug info : function merge expected o {object} and n {object} , the arguments are " , arguments ) ;    }
    /**}}**/
   

    o = type(o) === "object" ? o : {};
    n = type(n) === "object" ? n : {};

    var obj = clone(o) ; // a new copy

    for (var q in n)
    {
        obj[q] = n[q];
    }

    return obj ;
}

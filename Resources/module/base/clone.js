var isObject = require("./isObject").isObject ;
/**
 * clone a new object
 */

function clone(obj)
{   
    if( isObject(obj) )
	{
        var cloneObj = new Object();
        
        for(var i in obj)
        {
        	cloneObj[i] = clone(obj[i]);   
        }
        
        return cloneObj;  
	}
    
    var newObj = obj ;
    return newObj ;
}

exports.clone = clone ;
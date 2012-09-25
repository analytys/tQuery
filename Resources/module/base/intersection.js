/**
 * 数组取交集 
 */

var unique = require("./unique").unique ;
var type = require("./type").type ;
var inArray = require("./inArray").inArray ;

function intersection()
{
		var ret = new Array();
		
		jen = arguments.length ; 
	    if ( jen < 2 ) // 取交集至少要2个数组
    	{
	    	return ret ;
    	}
	    // 先合并成一个大数组，然后遍历这个大数组的每一个元素，判断这个元素在所有数组中的存在
	    n = 0 ;
	    while ( n < jen )
	    {   
	        var arg = arguments[n] ;
	    	n++ ;
	    	
	    	if( type(arg) !== "array" )
    		{
	    		continue;
    		}
	    	
	    	for(var p = 0 , pen = arg.length ;  p < pen ;p++ )
	    	{
	    	  ret.push(arg[p]);
	    	}
	    }

	    ret = unique(ret);
	    
	    for( var i = 0 ,len = ret.length ;i < len ;i++)
    	{
	    	var exists = true ;
	    	for( var j = 0 ; j < jen ;j++)
	    	{
	    		if( -1 === inArray( ret[i] , arguments[j] ) )
	    		{
	    			exists = false ;
	    			break ;
	    		}
	    	}
	    	
	    	if( !exists )
	    	{
	    		delete ret[i] ;
	    	}
    	}
	
	    var r = new Array();
	    for( var k in ret)
    	{
	    	r.push( ret[k] );
    	}
	    
	    return r ;
};

exports.intersection = intersection ;
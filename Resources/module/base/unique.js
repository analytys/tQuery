/**
 * 一维数组去重 
 */

var type = require("./type").type ;

unique = function( args )  
{  
	args = type(args) === "array" ? args : new Array();

	var a = []; var l = args.length;   
	for (var i = 0; i < l; i++)   
	{   
	   for (var j = i + 1; j < l; j++)  
	   {   
	       if (args[i] === args[j]) j = ++i;
	   }   
	   a.push(args[i]);   
	}   
	
	return a;   
};     

exports.unique = unique ;
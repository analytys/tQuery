/**
 * 	 * {
	 * 		type:"window",
	 * 		title : "Hello tQuery",
	 * 		color : "#fff000",
	 * 		background-image : "img/bk.png" ,
	 * 		children : [
	 * 					{
	 * 						type : "label",
	 * 						id : "label_register" ,
	 * 						cls : "normal",
	 * 						style : "",
	 * 					},
	 * 					{
	 * 						type : "view",
	 * 						children : [
	 * 										{
	 * 											type : "TextField",
	 * 											hint : L("put your name") ,
	 * 										}
	 * 									] ,
	 * 					},
	 * 					{
	 * 						type : "button",
	 * 						click : function(){},
	 * 						event : {
	 * 									dblclick : function(e){},
	 * 									click : function(e){}
	 * 								}
	 * 					},
	 * 					]
	 * 
	 * }

 * @param opt
 * @returns {Function}
 */

var tQueryid  ;

var tQuery_list ; 
var tag_list ;
var id_list ;
var cls_list ;

var current_page ; // 设置当前处理的page


// 略微特殊一点
function pushtQueryList(element,parent)
{
//	pushList(tQuery_list,element,parent);
}

function pushTagList(tag,tid)
{
	pushList(tQuery_list,tag ,tid);
}

function pushClsList(cls,tid)
{
	// 一个元素可能有多个cls
	// 将cls切分
	var arr = cls.split("") ;
	for(i=0,len<arr.length;i<len;i++)
	{
		pushList(tQuery_list, trim(arr[i]) ,tid);
	}
}

function pushidList(id,tid)
{
	pushList(tQuery_list,id , tid);
}

function pushList(list,type,tid)
{
	list.type = tid ;
}

function gettQueryid()
{
	var tQueryid = tQueryid || parseInt(Math.random() * (1000000 - 100 + 1) + 100) ;
	return tQueryid + 1 ;
};

/*****for test *****/
function trim(str)
{
	return str ;
}

var tQuery = {
		type : function(ele)
		{
			return "object" ;
		} ,
		
		inArray : function(a,b)
		{
			return true ;
		}
};
/****** for test *****/

function addElementToUIChain(element)
{
	element = tQuery.type(element) === "object" ? element : {};
	
	if( element.has )
};

function handleChildren(children)
{
	children = children ? children : [] ; // 判断是否数组
	for(var i=0,len=children.length;i<len;i++)
	{
		handleUI(children[i]);
	}
}

function handleUI( obj , parent )
{
		var types = ["page","window","view","button"] ;

		// handle type 
		if( !obj.hasOwnProperty("type") )
		{
			// log error
			return ;
		}
		
		// Unrecognized type
		if( !tQuery.inArray(obj.type,types) )
		{
			// log error
			return ;
		}
		
		var tQueryid = gettQueryid(); // tQuery 有guid 方法，只要保证唯一即可
		
		// 添加到 tQueryid 列表
		pushtQueryidList( obj , parent , tQueryid);
		
		// 添加到tag列表
		pushTagList(obj.type );
		
		// 添加到id列表
		if( obj.hasOwnProperty("id") )
		{
			pushidList(obj.id , tQueryid );
		}
		
		// 添加到cls列表
		if( obj.hasOwnProperty("cls") )
		{
			pushClsList(obj.cls , tQueryid );
		}

		if( obj.hasOwnProperty("className") )
		{
			pushClsList(obj.className , tQueryid);
		}
		
		/* 处理子element */
		if( obj.hasOwnProperty("children") )
		{
			handleChildren(obj.children);
		}
};


function create(opt)
{
	opt = tQuery.type(opt) === "object" ? opt : {} ; 
	
	// 默认给opt添加一个page父对象
	if( !opt.hasOwnPropertype("type") || opt.type != "page" )
	{
		opt = {
				type: "page" ,
				children : [ opt ] , // children 数组
		};
	}
	
	
	
	return function()
	{
		return handleUI(page) ;
	} ;
}
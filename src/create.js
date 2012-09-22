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


/**
 * 创建UI 对象
 * like  :
 * 
 * {
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
 * 
 * 内部存储：
 * 
 * 每一个element 唯一绑定一个tQueryid
 * 
 * tQueryid list
 * {
 * 		aaaaaa : {
 * 					parent : tQueryid ,
 * 					children : [tQueryid ,tQueryid,tQueryid ],
 * 					opt : {},
 * 					...........
 * 				}
 * }
 * 
 * 根据id , cls , tag 
 * 
 * {
 * 		a : tQueryid , 
 * 		b : tQueryid , 
 * }
 * 
 * @param {Object} obj 布局page对象
 */
tQuery.extend({
	UiChain : (function() {
	// 创建一个隐藏的object, 这个object持有一些数据
	// 从外部是不能访问这个object的
	var data = {};
	// 创建一个函数, 这个函数提供一些访问data的数据的方法
	return function(key, val) {
	    if (val === undefined)
	    {
	    	return data[key] ;
	    } // get
	    else
	    {
	    	return data[key] = val ;
	    } // set
	};
	// 我们可以调用这个匿名方法
	// 返回这个内部函数，它是一个闭包
	})()
	,
	
	create : function(opt)
	{
		return (function(opt)
		{
			var tQueryid  = parseInt(Math.random() * (10000 - 100 + 1) + 100) ;
		
			/* 只保留tQueryid list */
			var tag_list = {} ;
			var id_list = {};
			var cls_list = {};
			var tQuery_list = {} ;
			
			// 略微特殊一点
			// 
			//{
			//	tQueryid : {
			//      ti : TiObject 
			//		parent : tQueryid ,
			//		children : [tQueryid,tQueryid]
			//		opt : {}  // copy from opt , non children
				
			//	}
			//}
			function pushtQueryidList(tQueryid , obj , parent)
			{
				var opt = {} ; // new copy
				for(var i in obj )
				{
					opt[i] = obj[i] ;
				}
				
				if(opt['children'])
				{
					delete opt.children ;
				}
				
				tQuery_list[tQueryid]  = tQuery_list[tQueryid] || {} ;
				tQuery_list[tQueryid]['parent'] = parent || "" ;
				tQuery_list[tQueryid]['opt'] = opt ;
				tQuery_list[tQueryid]['children'] =  tQuery_list[tQueryid]['children'] || [] ;
				
				if( tQuery_list[parent]) // 存在说明则更新父节点的子节点值
				{
					tQuery_list[parent]['children'].push( tQueryid ) ;
				}
			}
			
			
			function pushTagList(tag,tid)
			{
				tag_list[tag] = tag_list[tag] || [] ;
				tag_list[tag].push( tid );
			}
			
			function pushClsList(cls,tid)
			{
				// 一个元素可能有多个cls
				// 将cls切分
				var arr = cls.split("") ;
				for(var  i = 0,len=arr.length;i<len;i++)
				{
					cls_list[cls] = cls_list[cls] || [] ;
					cls_list[cls].push(tid);
				}
			}
			
			function pushidList(id,tid)
			{
				id_list[id] = cls_list[id] || [] ;
				id_list[id].push(tid);
			}
			
			function gettQueryid()
			{
				return ++tQueryid ;
			};
			
			/*****for test *****/
			function trim(str)
			{
				return str ;
			}
			
			function L(str)
			{
				return str ;
			}
			/****** for test end *****/
			
			function handleChildren(children , parent )
			{
				children = children ? children : [] ; // 判断是否数组
				for(var i=0,len=children.length;i<len;i++)
				{
					handleUI(children[i] , parent );
				}
			}
			
			function handleUI( obj , parent )
			{
					var types = ["page","window","view","button"] ;
			
					// handle type 
					if( !obj["type"] )
					{
						// log error
						return ;
					}
					
					// Unrecognized type
					if( -1 == tQuery.inArray(obj.type.toLowerCase(),types) )
					{
						// log error
						return ;
					}
					
					var tQueryid = gettQueryid(); // 当前对象的唯一标识符
					
					// 添加到 tQueryid 列表
					pushtQueryidList( tQueryid , obj , parent );
					
					// 添加到tag列表
					pushTagList(obj.type.toLowerCase() , tQueryid );
					
					// 添加到id列表
					if( obj["id"] )
					{
						pushidList(obj.id.toLowerCase() , tQueryid );
					}
					
					// 添加到cls列表
					var clsAlias = ['cls',"className","class"] ; 
					for(var alias in clsAlias )
					{
						if( obj[alias] )
						{
							pushClsList(obj[alias] , tQueryid );	// 这里要确认class名称是否大小写敏感
						}
					}
					
					/* 处理子element */
					if( obj["children"] )
					{
						handleChildren(obj.children , tQueryid );
					}
			};
			
			
			function create(opt)
			{
				opt = (opt && tQuery.type(opt) === "object") ? opt : {} ; 
				
				// 默认给opt添加一个page父对象
				if( !opt["type"] || opt.type != "page" )
				{
					opt = {
							type: "page" ,
							children : [ opt ] , // children 数组
					};
				}
				
				return handleUI(opt);
			}
			
			function createTiUi(opt)
			{
				create(opt);				
				
				console.log(tag_list);
				
				// add list to chain
				tQuery.UiChain('id' , id_list );
				
				tQuery.UiChain('cls', cls_list );
				
				tQuery.UiChain('tag', tag_list);
				
				tQuery.UiChain('chain' , tQuery_list );
			}
			
			return createTiUi(opt) ; // return function
			
		})(opt);
	},

});

// UIchain 对象用于扩展tQuery
// UIchain = {
//	"id":{},
//	"cls":{},
//	"tag":{},
//	"tlist":{},
//}

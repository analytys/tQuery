/**
 * tQuery framework simple  
 */

var isObject = require("./module/base/isObject").isObject ;
var isArray = require("./module/base/isArray").isArray ;
var type = require("./module/base/type").type ;
var inArray = require("./module/base/inArray").inArray ;
var merge = require("./module/base/merge").merge ;

/**
 *  
 * @param {Object} selector
 * @param {Object} context
 */
tQuery = function(selector,context)
{
    return new tQuery.fn.init(selector,context); 
};

//Ui Chain Object 以Page的方式来管理，这个chain始终存在不需要清除
tQuery.prototype = tQuery.UiChain = (function() {
    // 创建一个隐藏的object, 这个object持有一些数据
    // 从外部是不能访问这个object的
    var data = {};
    // 创建一个函数, 这个函数提供一些访问data的数据的方法
    return function(key, val){
        if (val === undefined)
        {
            return data[key] ;
        } // get
        else
        {
            data[key] =  val ; 
            
            return data[key] ;
        } // set
    };
})();

/* tQuery type method */
tQuery.prototype = tQuery.type =  type ;
tQuery.prototype = tQuery.inArray = inArray ;
tQuery.prototype = tQuery.isObject = isObject ;
tQuery.prototype = tQuery.merge = merge ;


/* clone method */
tQuery.prototype = tQuery.clone = require("./module/base/clone").clone ;

/* trim method */
tQuery.prototype = tQuery.trim = require("./module/base/trim").trim ;


/* ui elements */
tQuery.prototype = tQuery.elements = require("./module/api/elements").elements ;

/* console debug */
tQuery.prototype = tQuery.console = require("./module/api/console").console ;


tQuery.prototype = tQuery.fn  = {
    /**
     * 创建UI布局对象
     * 
     * 1. 创建的UI布局对象是全局的
     * 2. 先创建的和后创建的，是同一个全局的对象，后创建的合并到先创建的chain中
     * 3. 可以方便的测试
     * 4. create 方法返回一个tQuery 对象，可以访问tQuery对象的所有方法
     * 
     * @param {Object} opt
     * @return {Object}
     */
    create : function(opt)
    {
        return (function(opt)
        {
        	// 这5个变量，注册到全局(tQuery)
            // get tQueryid value
        	var tQueryid  = tQuery.UiChain("tQueryid") || 9999 ; 

            /* set ui chain list */
            var tag_list = tQuery.UiChain('tag')    	|| {} ;       
            
            var id_list = tQuery.UiChain('id')      	|| {} ;
            var cls_list = tQuery.UiChain('cls')    	|| {} ;
            var tQuery_list = tQuery.UiChain('chain') 	|| {} ;
            
            // 略微特殊一点
            // 
            //{
            //  tQueryid : {
            //      ti : TiObject 
            //      parent : tQueryid ,
            //      children : [tQueryid,tQueryid]
            //      opt : {}  // copy from opt , non children
            //  }
            //}
            function pushtQueryidList(tQueryid , obj , parent)
            {
            	// new copy
                var opt = tQuery.clone(obj);
                
                if(opt['children'])
                {
                    delete opt.children ;
                }
                
                tQuery_list[tQueryid]  = tQuery_list[tQueryid] || {} ;
                tQuery_list[tQueryid]['parent'] = parent || "" ;
                tQuery_list[tQueryid]['opt'] = opt ;
                tQuery_list[tQueryid]['children'] =  tQuery_list[tQueryid]['children'] || [] ;
                
                if( tQuery_list[parent]) // 存在则更新父节点的子节点值
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
                var arr = cls.split(" ") ;
                console.log("clsarr",arr);
                for(var  i = 0,len=arr.length;i<len;i++)
                {
                	arr[i] = tQuery.trim(arr[i]);
                    cls_list[arr[i]] = cls_list[arr[i]] || [] ;
                    cls_list[arr[i]].push(tid);
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
                    // handle type 
                    if( !obj["type"] )
                    {
                        // log error
                        return tQuery.console.error("type is required for each ui element");
                    }
                    
                    // Unrecognized type
                    if( -1 === tQuery.inArray(obj.type , tQuery.elements ) )
                    {
                        // log error
                        return tQuery.console.error("Unrecognized type " + obj.type );
                    }
                    
                    var tQueryid = gettQueryid(); // 当前对象的唯一标识符
                    
                    // 添加到 tQueryid 列表
                    pushtQueryidList( tQueryid , obj , parent );
                    
                    // 添加到tag列表
                    pushTagList(obj.type , tQueryid );
                    
                    // 添加到id列表
                    if( obj["id"] )
                    {
                        pushidList(obj.id , tQueryid );
                    }
                    
                    // 添加到cls列表
                    var clsAlias = ['cls',"className","class"] ; 
                    for(var alias in clsAlias )
                    {
                        if( obj[alias] )
                        {
                            pushClsList(obj[alias] , tQueryid );    // 这里要确认class名称是否大小写敏感
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
                /* 以Page的方式来管理Ui，方便不用的Ui及时创建或者销毁 */
                if( !opt["type"] || opt.type != "Page" )
                {
                    opt = {
                            type: "Page" ,
                            children : [ opt ] , // children 数组
                    };
                }
                
                
                return handleUI(opt);
            }
            
            
            function createTiUi(opt)
            {
                create(opt);                
                
                addListToChain();   
                
                return tQuery.UiChain();        
            }
            
            function addListToChain()
            {
                // add list to chain
                tQuery.UiChain('id' , id_list );
                
                tQuery.UiChain('cls', cls_list );
                
                tQuery.UiChain('tag', tag_list);
                
                tQuery.UiChain('chain' , tQuery_list );
                
                tQuery.UiChain('tQueryid', gettQueryid() ); // set new tQueryid 

            }
            
            return createTiUi(opt) ; // return function
            
        })(opt);
    },
    
    init : function(selector,context)
    {
    	// handle layout object
    	if( type(selector) === "object" )
		{
    		return tQuery.fn.create(selector , context );
		}
    	
        // handle #id
    }
    
};



exports.tQuery = tQuery ;
/**
 * tQuery framework simple  and easy
 */

var isObject = require("./module/base/isObject").isObject ;
var isArray = require("./module/base/isArray").isArray ;
var type = require("./module/base/type").type ;
var inArray = require("./module/base/inArray").inArray ;
var merge = require("./module/base/merge").merge ;
var getMulitClass = require("./module/base/getMulitClass").getMulitClass ;
var isNumber = require("./module/base/isNumber").isNumber ;
var createUi = require("./module/api/createUi").createUi ;

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

/* clear ui chain */
tQuery.prototype = tQuery.clear = function()
{
    var resume = {} ;
    var chains = ['id','tag','cls','chain'];
    for(var i=0,len = chains.length; i< len; i++)
    {
            tQuery.UiChain(chains[i] , resume );    
    }

    return new tQuery.fn.init();    
}

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
            
            
            var current_page ;
            
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
                var event = {};
                
                if(opt['event'])
                {
                    event = tQuery.clone(opt.event);   
                    
                    delete opt.event ; 
                }
                
                if(opt['children'])
                {
                    delete opt.children ;
                }
                
                tQuery_list[tQueryid]  = tQuery_list[tQueryid] || {} ;
                tQuery_list[tQueryid]['parent'] = parent || "" ;
                tQuery_list[tQueryid]['children'] =  tQuery_list[tQueryid]['children'] || [] ;
                tQuery_list[tQueryid]['event'] =  event ;
                // 添加event事件，event属性不做查找依据，可以直接添加到tQuerylist 中
                for(var evt in opt )
                {
                    if ( tQuery.type(opt[evt] ) === "function" )
                    {
                        tQuery_list[tQueryid]['event'][evt] =  opt[evt] ;
                        
                        delete opt[evt] ;
                    }
                }
                
                if( tQuery_list[parent]) // 存在则更新父节点的子节点值
                {
                    tQuery_list[parent]['children'].push( tQueryid ) ;
                }

                if( opt['event'])                
                {
                    delete opt.event ;
                }
                
                tQuery_list[tQueryid]['opt'] = opt ;
                
            }
            
            function pushTagList(tag,tid)
            {
                tag_list[tag] = tag_list[tag] || [] ;
                tag_list[tag].push( tid );
            }
            
            function pushClsList(cls,tid)
            {
                // 一个元素可能有多个cls
                var clses = getMulitClass(cls);
                for(var  i = 0,len=clses.length;i<len;i++)
                {
                    cls_list[clses[i]] = cls_list[clses[i]] || [] ;
                    cls_list[clses[i]].push(tid);
                }
            }
            
            // id 是唯一的，有且只能有一个
            function pushidList(id,tid)
            {
                id_list[id] = cls_list[id] || {} ;
                id_list[id]  =  tid  ;
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
                    
                    // 初始化当前页
                    if(!current_page)
                    {
                        current_page = tQueryid ;
                    }
                    
                    
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
                        if( obj[clsAlias[alias]] )
                        {
                            pushClsList(obj[clsAlias[alias]] , tQueryid );    // 这里要确认class名称是否大小写敏感
                        }
                    }
                    
                    // 遍历，处理event
                    
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
            
            function createUiChain(opt)
            {
                create(opt);
                
                addListToChain();   
                
                createUi( tQuery.UiChain("chain") );
                return tQuery(current_page);
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
            
            return createUiChain(opt) ; // return function
            
        })(opt);
    },
    
    init : function(selector,context)
    {
        this.tQueryid ; //  当前处理对象的tQueryid 属性
        
        // Handle $(""), $(null), $(undefined), $(false)
        if ( !selector ) {
            return this;
        }
        
    	// handle layout object
    	if( type(selector) === "object" )
		{
    		return tQuery.fn.create(selector , context );
		}
    	
    	// handle number internal use only 
    	if( isNumber(selector) )
    	{
    	   if( tQuery.UiChain("chain")[selector] )      
    	   {
    	       this.tQueryid = selector ;
    	       
    	       return this ;
    	   }
    	   
    	   /**DEBUG{{**/
    	   else
    	   {
    	       tQuery.console.error( "UiChain chain has no tQueryid as " + selector );
    	   }
	       /**}}**/
    	}
    	
    	// handle #id
    	var match = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/.exec("#id");
    	if(match && match[2] )
    	{
    	   var id = match[2];
    	   
    	   if( tQuery.UiChain("id")[id] )
    	   {
                this.tQueryid = tQuery.UiChain("id")[id] ;
                
                return this ;      	       
    	   }
           /**DEBUG{{**/
           else
           {
               tQuery.console.error( "UiChain id has no tQueryid as " + tQuery.UiChain("id")[id] + "and the id is " + id );
           }
           /**}}**/
    	   
    	}
    	
        //
    }
    
};



exports.tQuery = tQuery ;
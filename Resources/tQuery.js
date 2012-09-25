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
 * @param {Object} context 父对象
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
    return function(key, val ){
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

/* istQueryObject */
tQuery.prototype = tQuery.istQueryObject = function(obj)
{
	return obj instanceof tQuery.fn.init ;
};

/* clear ui chain */
tQuery.prototype = tQuery.clear = function()
{
    // 这里测试发现如果不设为undefined的话会出现莫名其妙的问题，暂不知道原因
	var resume = undefined ;
    var chains = ['id','tag','cls','chain'];
    for(var i=0,len = chains.length; i< len; i++)
    {
            tQuery.UiChain(chains[i] , resume );    
    }

    tQuery.UiChain("tQueryid" , 9999 );
    
    return new tQuery.fn.init();
};

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
    create : function(opt , parent )
    {
        return (function(opt , parent )
        {
        	// 这5个变量，注册到全局(tQuery)
            // get tQueryid value
        	var tQueryid  = tQuery.UiChain("tQueryid") || 9999 ; 

            /* set ui chain list */
            var tag_list = tQuery.UiChain('tag')    	|| {} ;       
            
            var id_list = tQuery.UiChain('id')      	|| {} ;
            var cls_list = tQuery.UiChain('cls')    	|| {} ;
            var tQuery_list = tQuery.UiChain('chain') 	|| {} ;
            
            
            var current_page = undefined ;
            
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
            function pushtQueryidList(tQueryid , obj , parent )
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
            // 但是不同的page里面id也不可以相同（最简单最优的处理方式）
            // 防止Ti中id相同造成一些bug
            function pushidList(id,tid)
            {
                id_list[id] = cls_list[id] || {} ;
                id_list[id] =  tid ;
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
                    
                    // 初始化当前页,如果有父对象则设父对象的page为当前页
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
                    var clsAlias = new Array('cls',"className","class") ; 
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
            
            
            function create(opt , parent )
            {
                opt = (opt && tQuery.type(opt) === "object") ? opt : {} ; 
                
                // 不能在handleUI里面添加对parent类型的判断
                // handleUI不负责父对象的处理，只管添加Ui element
                if( parent && tQuery.istQueryObject(parent) )
                {
                	for(var i=0,len=parent.length;i<len;i++)
            		{
                		// 如果parent.context[i]是Page类型，则取Page的下一级子对象进行添加
                		// TODO 这里可能需要封装起来
                		var tid = parent.context[i] ;
                		if( !tQuery.UiChain("chain")[tid] )
            			{
                			continue;
            			} 
                		
                		if ( tQuery.UiChain("chain")[tid]['opt']['type'] == "Page" )
            			{
                			tid = tQuery.UiChain("chain")[tid]['children'][0];
            			}
                		handleUI( opt , tid ); 
            		}
                }
                else if( !parent && ( !opt["type"] || opt.type != "Page" )  )
                {
                	// 默认给opt添加一个Page父对象
            		// 以Page的方式来管理Ui，方便不用的Ui及时创建或者销毁
                	// 一个Page只能有一个子对象
                    opt = {
                            type: "Page" ,
                            children : [ opt ] , // children 数组
                    };

                    return handleUI( opt );
                }
                else
            	{
                	return handleUI( opt );
            	}

            }
            
            function createUiChain(opt, parent)
            {
                create(opt, parent );
                
                addListToChain();   
                
                // TODO 渲染样式表
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
            
            return createUiChain(opt , parent ) ; // return function
            
        })(opt , parent );
    },
    
    init : function(selector, parent)
    {
    	// The default length of a tQuery object is 0
    	this.length = 0 ;

        this.context ; //  当前处理对象环境
        
        this.selector = selector ; // 当前对象的选择器
        
        // TODO 暂时还不支持 第二个参数制定父节点，在父节点中查找子节点
        // 第二个参数parent的类型必须是一个tQuery对象
        // 父节点中查找子节点   有可能是父父...节点
        this.__construct = function( selector, parent ) 
        {
            // Handle $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }

            // handle layout object 以后可能会添加xml布局支持
        	if( type(selector) === "object" )
    		{
        		return tQuery.fn.create(selector , parent );
    		}
        	
        	// handle number internal use only 
        	if( isNumber(selector) )
        	{
        	   if( tQuery.UiChain("chain")[selector] )
        	   {
        	       this.context = [selector] ;
        	       this.length  = 1 ;
        	       
        	       return this.__findChild( parent ) ;
        	   }
        	}
        	
        	// handle #id
        	var match = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/.exec(selector);
        	if(match && match[2] )
        	{
        	   var id = match[2];
        	   
        	   if( tQuery.UiChain("id")[id] )
        	   {
                    this.context = [ tQuery.UiChain("id")[id]  ]  ; // id 不可以有多个
                    this.length = 1 ;

                    return this.__findChild( parent ) ;
        	   }
        	}
        	
        	// handle .class
        	if( tQuery.type(selector) === "string" && selector.charAt(0) === '.' )
    		{
        		var cls = selector.slice(1);
        		if( tQuery.UiChain("cls")[cls] && tQuery.UiChain("cls")[cls].length > 0 ) // 数组
    			{
        			this.context = tQuery.UiChain("cls")[cls] ;
        			this.length = this.context.length ;
        			
        			return this.__findChild( parent ) ;
    			}
    		}
        	
        	
        	// handle tag 
        	if( -1 !== tQuery.inArray( selector , tQuery.elements ) )
    		{
        		if( tQuery.UiChain("tag")[selector] && tQuery.UiChain("tag")[selector].length > 0 ) 
        		{
        			this.context = tQuery.UiChain('tag')[selector] ;
        			this.length = this.context.length ;
        			
        			return this.__findChild( parent ) ;
        		}
    		}
        	
        	// default 
        	return this ; 
        };
        
        // 给定父节点，筛选出子节点 
        // 算法一：
        // this.context 是已经根据selector查找到的子节点，
        // 找出所有这些子节点的父节点 parents 
        // 取parent.context 和 parents的交集 ，得到的就是查找到的父节点
        // 遍历this.context ，如果父节点存在于交集中，则此节点查找成功
        
        // 算法二：（采用）
        // 找到parent的所有子节点（递归查找）
        // 取parent的所有子节点和this.context 的交集，查找成功
        // TODO 提升效率，优化查找算法
    	this.__findChild = function( parent )
    	{
    		if( tQuery.istQueryObject(parent) )
			{
    			// this.context 是已经匹配的所有子节点，递归一层一层向上匹配父节点
    			var children = new Array(); // 所有指定父节点的子节点
    			if( parent.context && parent.context.length > 0 )
				{
    				for( var i =0 ;i < this.length ; i++)
					{
    					this.__getChildren( parent.context[i] , children );
					}
				}
    			
    			// 取交集 children 和 this.context
    			// 不需要关心是否改变了children 和 this.context 的值
    			// 修改this.context 为新的集合
    			this.context = intersection( children , this.context );
    			
    			// 修改this.length
    			this.length = this.context.length ;
			}
    		
    		return this ;
    	};
    	
    	/**
    	 * 递归查找子节点 parent是 tQueryid
    	 */
    	this.__getChildren = function( parent , children )
    	{
    		children = children || [];
    		
    		var obj = tQuery.UiChain("chain")[parent] ;
    		if (  !obj )
			{
    			return children ;
			}
    		
    		len = obj.children.length ;
    		if( len <=0 )
			{
    			return children  ;
			}
    		
    		for( var i = 0;i<len ; i++)
			{
    			children.push( obj.children[i] );
    			
    			this.__getChildren( obj.children[i] , children );
			}
    	};

    	
    	/**
    	 * child 是 tQueryid
    	 * 暂时废弃 
    	this.__getParent = function( child , list )
    	{
    		list = list || [] ; // 用于存储找到的父节点
    		
    		var obj = tQuery.UiChain("chain")[child] ;
    		if (  !obj )
			{
    			return list ;
			}
    		
    		if( !obj.parent )
			{
    			return list ;
			}
    		
    		list.push( obj.parent ) ;
    		
    		return this.__getParent( obj.parent , list );
    	};
    	 */
    	
    	// The number of elements contained in the matched element set
    	this.size = function()
    	{
    		return this.length;
    	};
    	
    	return this.__construct(selector , parent ) ;

    }
    
};



exports.tQuery = tQuery ;
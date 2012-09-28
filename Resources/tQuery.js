/**
 * tQuery framework simple  and easy
 * /**
 * open source less render css  
 * 开发完后直接生成一个固定的css样式文件，以后就可以直接用省略编译步骤提升速度 
 * 监视less文件，有改动自动生成css文件
 * 支持多个less文件，不同的系统或者分辨率使用不同的less
 * 
 * 缺陷，less这种预处理的方式很影响效率，如果一开始就处理，会延长app打开的时间
 * 
 * 直接定义js 的 object 写法上注意一点就行，实现简单，效率高
 * 
 * @link http://less.cnodejs.net/tools
 * 
 * JSS
 * @link http://classtyle.com/jss/
 * useage:
 * app.js 
 * (function(global){
 * 		global.tQuery = global.$ = tQuery = $ = require("./tQuery").tQuery ; 
 * })(this);
 * 
 * 
 */









/**DEBUG{{**/
if( typeof Ti === "undefined")
{
	var Ti = require("./test/ti").Ti ;
}
/**}}**/



/**
 * 遍历数组元素
 * @param callback 回调函数
 */
Array.prototype.foreach = function( callback )
{
	for( var i = 0 ,len = this.length ; i< len ; i++)
	{
		callback.call( callback , i , this[i] , this );
	}
};



/**
 * tQuery 构造函数，返回tQuery对象 
 * @param {Object} selector 选择器
 * @param {Object} context 父tQuery对象
 * @return {Object} tQuery
 */
tQuery = function(selector,context)
{
    return new tQuery.fn.init(selector,context); 
};

//Ui Chain Object 以Page的方式来管理，这个chain始终存在不需要清除
tQuery.prototype = tQuery.UiChain = (function(){
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

/* ui elements */
tQuery.prototype = tQuery.elements = new Array(
        "Window" , 
        "AlertDialog",
        "Animation",
        "Button",
        "ButtonBar",
        "CoverFlowView",
        "DashboardItem",
        "DashboardView",
        "EmailDialog",
        "ImageView",
        "Label",
        "MaskedImage",
        "Notification",
        "OptionDialog",
        "Picker",
        "PickerColumn",
        "PickerRow",
        "ProgressBar",
        "ScrollableView",
        "ScrollView",
        "SearchBar",
        "Slider",
        "Switch",
        "Tab",
        "TabbedBar", // DEPRECATED since 1.8.0
        "TabGroup",
        "TableView",
        "TableViewRow",
        "TableViewSection",
        "TextArea",
        "TextField",
        "Toolbar" , //  DEPRECATED since 1.8.0
        "View",
        "WebView",
        "Window"
) ;


/* console debug */
tQuery.prototype = tQuery.console = {
        debug : function(){
                return  Ti.API.debug.call( Ti.API , arguments[0] )  ;
            },        
        error : function(){
            return  Ti.API.error.call( Ti.API , arguments[0] )  ;
        },
        info : function(){
            return   Ti.API.info.call( Ti.API , arguments[0] )  ;
        },
        log : function(){
            return Ti.API.log.call( Ti.API , arguments[0] ) ;
        },
        warn : function(){
            return Ti.API.warn.call( Ti.API , arguments[0] );
         },
        trace : function(){
            return Ti.API.trace.call( Ti.API , arguments[0] )  ;
        },
        timestamp : function(){
            return Ti.API.timestamp.call( Ti.API , arguments[0] ) ;
        },
};



/* tQuery type method */
tQuery.prototype = tQuery.type =  function(obj)
{
    switch(obj)
    {  
        case null:  
            return "null";  
        case undefined:  
            return "undefined";  
    }  

    var s = Object.prototype.toString.call(obj);
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
}  ;


tQuery.prototype = tQuery.inArray = function( elem, arr, i ) {
	var len;

	if ( tQuery.isArray(arr) && arr.length > 0 ) {
		if ( Array.prototype.indexOf  ) {
			return Array.prototype.indexOf.call( arr, elem, i );
		}

		len = arr.length;
		i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

		for ( ; i < len; i++ ) {
			if ( i in arr && arr[ i ] === elem ) {
				return i;
			}
		}
	}

	return -1;
};
tQuery.prototype = tQuery.isObject = function( obj )
{
	return tQuery.type(obj) === "object" ;
};

tQuery.prototype = tQuery.isArray = function(array)
{
    return tQuery.type(array) === "array" ;
};


tQuery.prototype = tQuery.merge = function(o,n)
{
    o = tQuery.type(o) === "object" ? o : {};
    n = tQuery.type(n) === "object" ? n : {};

    var obj = tQuery.clone(o) ; // a new copy

    for (var q in n)
    {
        obj[q] = n[q]; // 覆盖合并
    }

    return obj ;
};


/* clone method */
tQuery.prototype = tQuery.clone = function(obj)
{   
    if( tQuery.isObject(obj) )
	{
        var cloneObj = new Object();
        
        for(var i in obj)
        {
        	cloneObj[i] = tQuery.clone( obj[i] );
        }
        
        return cloneObj;
	}
    
    var newObj = obj ;
    return newObj ;
} ;



/* trim method */
tQuery.prototype = tQuery.trim = function(str)
{
    str = new String(str) ;
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
};



/**
 * 设备平台信息
 */
tQuery.prototype = tQuery.device = {
	osname : Ti.Platform.osname,
    version : Ti.Platform.version,
    density : Ti.Platform.displayCaps.density , // 显示像素密度
    dpi : Ti.Platform.DisplayCaps.dpi , 
    logicalDensityFactor : Ti.Platform.DisplayCaps.logicalDensityFactor ,
    height : Ti.Platform.displayCaps.platformHeight,
    width : Ti.Platform.displayCaps.platformWidth ,
    xdpi : Ti.Platform.displayCaps.xdpi ,
    ydpi : Ti.Platform.displayCaps.ydpi ,
};

/**
 * css 样式，全局使用
 */
tQuery.prototype = tQuery.css = {};

/**
 * 全局缓存
 */
tQuery.prototype = tQuery.cache = {};

/* istQueryObject */
tQuery.prototype = tQuery.istQueryObject = function(obj)
{
	return obj instanceof tQuery.fn.init ;
};


tQuery.prototype = tQuery.getMulitClass = function(str)
{
    str = new String(str);
    
    if( str.indexOf(" ") === -1 )
    {
        return [str];
    }
    
    var ret = [];
    var arr = str.split(" ");
    for(var i =0 , len = arr.length ;i < len ;i++ )
    {
        if( tQuery.trim(arr[i]).length <= 0  )
        {
            continue ;
        }
        
        ret.push(arr[i]);
    }
    
    return tQuery.unique(ret);
};

/**
 * 
 * internal use only 
 * @param {Array} modules 模块文件路径(已经按照低早高晚的优先级规则排好序)
 * 
 */
tQuery.prototype = tQuery.__loadStyle = function( modules )
{
	// 遍历每一个属性，合并对象
	modules.foreach( function(i , module ){
		var css = require(module).style ;
		if(!css)
		{
		    tQuery.console.error("load the style module falid " + module );    
		}
		
		// TODO 这里的合并要考虑性能优化
		// css 对象很大的时候，每一次拷贝，遍历合并 开销肯定不小
		// 担心css成为一个很大的对象
		for( var p in css )
		{
			for( q in css[p] )
			{
				tQuery.css[p] = tQuery.css[p] || {};
				tQuery.css[p][q] = css[p][q] ;
			}
		}
	});
	
	return tQuery.css ;
};

/**
 * 返回对应的样式属性 
 * 结果要缓存起来，下次直接使用不需要再查找
 * 优先级为type cls id
 */
tQuery.prototype = tQuery.__getStyle = function( opt )
{
	opt = opt || {};
    var type = opt['type'] && tQuery.type(opt.type) === "string"  ? opt.type : "";
    
    var cls = opt['cls'] && tQuery.type(opt.cls) === "string"  ? opt.cls : ( 
    		opt['class'] &&  tQuery.type( opt['class'] === "string" 	) ? opt['class'] : (
    				opt['className'] &&  tQuery.type( opt['className'] )  === "string"  ? opt['className'] : "" 
    		)
    ) ;
    var id = opt['id'] && tQuery.type(opt.id) === "string"  ? opt.id : "" ;
    
    var key = type + "_" +  cls.replace(" " , '_') + "_" + id ;
    if( tQuery.cache[key] )
    {
    	return tQuery.cache[key] ;
    }
    
    var a = {} ;
    var b = {} ;
    var c = {} ;
    
    if( type )
    {
    	a = tQuery.css[type] || {} ;
    }
    
    if( cls )
    {
    	tQuery.getMulitClass( cls ).foreach( function( i , str ){
    		str = "." + str  ;
    		tQuery.css[str] = tQuery.css[str] || {};
    		b = tQuery.merge( b , tQuery.css[str] );
    	});
    }
    
    if( id )
    {
    	id = "#" + id ;
    	tQuery.css[id] = tQuery.css[id] || {} ;
    	c = tQuery.css[id] ;
    }
    
    var d = tQuery.merge( a , b );
    var e = tQuery.merge( d , c );
    
    // cache 
    tQuery.cache[key] = e ;
    
    return e ;
};

/**
 * 加载样式，初始化的时候加载
 * 优先级
 * 1.创建时设置的属性
 * 2.特定平台，特定分辨率
 * 3.特定平台，特定dpi
 * 4.特定平台
 * 5.通用属性
 * 
 * id > class > tag 
 * 
 * 最先读取的可以被覆盖，后读取的覆盖先读取的
 * 先读取优先级低的，再读取优先级高的
 * 
 */
tQuery.prototype = tQuery.loadStyle = function( paths )
{
	// 加载要存储起来，后面直接使用
	paths = paths || new Array(
		Ti.Filesystem.resourcesDirectory + "style/style", // 通用样式
		Ti.Filesystem.resourcesDirectory + "style/" + tQuery.device.osname  , // Android || iphone || ipad ...
		Ti.Filesystem.resourcesDirectory + "style/" + tQuery.device.osname + tQuery.device.version  , // Android4.0 || iphone-4s 
		Ti.Filesystem.resourcesDirectory + "style/" + tQuery.device.dpi  ,
		Ti.Filesystem.resourcesDirectory + "style/" + tQuery.device.osname + tQuery.device.width + "x" + tQuery.device.height 
	);
	
	var modules = new Array();
	
	paths.foreach( function(i , module ){
	    var file = Ti.Filesystem.getFile( module + ".js" );
	    if( file.exists() )
	    {
	    	modules.push( module );
	    }
	});

	return tQuery.__loadStyle( modules );};

tQuery.prototype = tQuery.unique = function( args )  
{  
	args = tQuery.type(args) === "array" ? args : new Array();

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


tQuery.prototype = tQuery.intersection = function()
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
    	
    	if( tQuery.type(arg) !== "array" )
		{
    		continue;
		}
    	
    	for(var p = 0 , pen = arg.length ;  p < pen ;p++ )
    	{
    		ret.push(arg[p]);
    	}
    }

    ret = tQuery.unique(ret);
    
    for( var i = 0 ,len = ret.length ;i < len ;i++)
	{
    	var exists = true ;
    	for( var j = 0 ; j < jen ;j++)
    	{
    		if( -1 === tQuery.inArray( ret[i] , arguments[j] ) )
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
    	if( ret[k] && tQuery.type(ret[k]) != "function" /* 数组有原型继承会导致这里出问题 */ ) 
		{
    		r.push( ret[k] );
		}
	}
    
    return r ;
};

tQuery.prototype = tQuery.isNumber = function(number)
{
    if( tQuery.type(number) === 'number' )
    {
        return true ;
    }
    
    var a = number ;
    number = Number(number);
    
    return a == number && /^\d+$/.test(number);
};




/**
 * 在tQuery对象上存储一些数据
 * @param {tQuery Object}obj
 * @param {Object|String} key
 * @param {String|Number|Array|Object|undefined} value
 * @returns {tQuery Object}
 */
tQuery.prototype = tQuery.data = function( obj , key , value)
{
    if( !tQuery.istQueryObject(obj) )
    {
        tQuery.console.error("tQuery.data expect params obj as tQuery object ");
        return new tQuery.fn.init();
    }
    
    if(!key)
    {
        tQuery.console.error("tQuery.data expect params key valid");
        return new tQuery.fn.init();
    }
    
    return obj.data( key , value );
};

/** 
 *  恢复使用别名$,和jQuery还是有很大区别的，
 *  jQuery依赖window，而这里不依赖，别名在引入的时候人为指定
 */
tQuery.prototype = tQuery.noConflict = function( deep )
{
	return tQuery;
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




/**
 * 调用ti api 创建ui对象
 * 根据当前选项，创建Ti UI 如果有父对象，添加当前layout到父对象上
 * 第二个参数是父对象{tQuery Object}，
 * 如果没有指定第二个参数，则不需要添加到父对象上
 * 
 * @param {Number} current_created_layout  当前创建的layout tQueryid
 * @param {tQuery Object} parent 父对象
 * @return 
 */
tQuery.prototype = tQuery.__createTiUi = function(current_created_layout , parent )
{
    // 先创建，后添加
    if( !current_created_layout )
    {
        return tQuery.console.error( "internal method __createTiUi expect params current_created_layout as valid tQueryid ");
    }
    
    var type = tQuery.UiChain("chain")[current_created_layout]['opt']['type'] ;
    var ele = tQuery.__createElementByType(type , tQuery.UiChain("chain")[current_created_layout]['opt'] );// ti ui object
    tQuery.UiChain("chain")[current_created_layout]['ti'] = ele ;
    
    var children = tQuery.UiChain("chain")[current_created_layout]['children'] ;
    children.foreach( function(i , tQueryid ){
        // 创建并添加到ui chain上
        tQuery.__createTiUi( tQueryid , tQuery(current_created_layout)  );
    } );
    
    if( parent && tQuery.istQueryObject(parent)  &&  parent.context[0] )
    {
        // children 添加到parent上
        var p  = tQuery.UiChain("chain")[ parent.context[0] ]['ti'] ;
        if( tQuery.typep(['add']) !== 'function' )
        {
            return tQuery.console.error( "object p has no method add");
        }
        
        p.add( ele );
    }
    
    // 这里不能将global对象返回
    return ;
};



tQuery.prototype = tQuery.__createElementByType = function( type , opt )
{
    opt = tQuery.isObject(opt) ? opt : {};
    if( -1 === tQuery.inArray( type , tQuery.elements ) )
    {
        return tQuery.console.error("pass internal method __createElementByType unexpect params type " + type );
    }
    
    switch( type )
    {
        case 'AlertDialog': 
            api = Ti.UI.createAlertDialog ; 
            break; 
        case 'Animation': 
            api = Ti.UI.createAnimation ; 
            break; 
        case 'Button': 
            api = Ti.UI.createButton ; 
            break; 
        case 'ButtonBar': 
            api = Ti.UI.createButtonBar ; 
            break; 
        case 'CoverFlowView': 
            api = Ti.UI.createCoverFlowView ; 
            break; 
        case 'DashboardItem': 
            api = Ti.UI.createDashboardItem ; 
            break; 
        case 'DashboardView': 
            api = Ti.UI.createDashboardView ; 
            break; 
        case 'EmailDialog': 
            api = Ti.UI.createEmailDialog ; 
            break; 
        case 'ImageView': 
            api = Ti.UI.createImageView ; 
            break; 
        case 'Label': 
            api = Ti.UI.createLabel ; 
            break; 
        case 'MaskedImage': 
            api = Ti.UI.createMaskedImage ; 
            break; 
        case 'Notification': 
            api = Ti.UI.createNotification ; 
            break; 
        case 'OptionDialog': 
            api = Ti.UI.createOptionDialog ; 
            break; 
        case 'Picker': 
            api = Ti.UI.createPicker ; 
            break; 
        case 'PickerColumn': 
            api = Ti.UI.createPickerColumn ; 
            break; 
        case 'PickerRow': 
            api = Ti.UI.createPickerRow ; 
            break; 
        case 'ProgressBar': 
            api = Ti.UI.createProgressBar ; 
            break; 
        case 'ScrollableView': 
            api = Ti.UI.createScrollableView ; 
            break; 
        case 'ScrollView': 
            api = Ti.UI.createScrollView ; 
            break; 
        case 'SearchBar': 
            api = Ti.UI.createSearchBar ; 
            break; 
        case 'Slider': 
            api = Ti.UI.createSlider ; 
            break; 
        case 'Switch': 
            api = Ti.UI.createSwitch ; 
            break; 
        case 'Tab': 
            api = Ti.UI.createTab ; 
            break; 
        case 'TabbedBar': 
            api = Ti.UI.createTabbedBar ; 
            break; 
        case 'TabGroup': 
            api = Ti.UI.createTabGroup ; 
            break; 
        case 'TableView': 
            api = Ti.UI.createTableView ; 
            break; 
        case 'TableViewRow': 
            api = Ti.UI.createTableViewRow ; 
            break; 
        case 'TableViewSection': 
            api = Ti.UI.createTableViewSection ; 
            break; 
        case 'TextArea': 
            api = Ti.UI.createTextArea ; 
            break; 
        case 'TextField': 
            api = Ti.UI.createTextField ; 
            break; 
        case 'Toolbar': 
            api = Ti.UI.createToolbar ; 
            break; 
        case 'View': 
            api = Ti.UI.createView ; 
            break; 
        case 'WebView': 
            api = Ti.UI.createWebView ; 
            break; 
        case 'Window': 
            api = Ti.UI.createWindow ; 
            break; 
        default:
            tQuery.console.error("Unrecognized UI element type " + k );
            break;
    }
    
    // TODO 添加css样式
    var option = tQuery.merge( opt , tQuery.__getStyle(opt) );
    return api(option);
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
            
            
            var current_created_layout = undefined ;
            
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
                    
                    // TODO 初始化当前页,如果有父对象则设父对象的layout为当前页
                    if(!current_created_layout)
                    {
                        current_created_layout = tQueryid ;
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
                    
                    // 全部转换成className 属性
                    obj['className'] = obj['className'] || "";
                    obj['cls'] = obj['cls'] || "";  
                    obj['class'] = obj['class'] || "";
                    
                    obj['className'] = obj['className'] + " " + obj['cls'] + " " + obj['class'] ; 
                    delete obj['cls'] ;
                    delete obj['class'] ;
                    
                    // TODO 遍历，处理event
                    
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
                		
                		// 为减免更多不必要的麻烦，废除page
                		handleUI( opt , tid ); 
            		}
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
                
                // TODO 渲染样式表 调用ti api 创建ui对象
                // 根据当前选项，创建Ti UI 如果有父对象，添加当前layout到父对象上
                // 第二个参数是父对象{tQuery Object}，
                // 如果没有指定第二个参数，则不需要添加到父对象上
                tQuery.__createTiUi( current_created_layout , parent )
                
                return tQuery(current_created_layout);
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
    
    // TODO jQuery的选择器太强大了，还有很多需要实现支持的
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
        	if( tQuery.type(selector) === "object" )
    		{
        		return tQuery.fn.create(selector , parent );
    		}
        	
        	// handle function
        	/**
        	 * tQuery(function($) {
             *   // 你可以在这里继续使用$作为别名...
             *   });
             **/
        	if( tQuery.type(selector) === "function" )
        	{
        	    return selector(tQuery);
        	}
        	
        	// handle number internal use only 
        	if( tQuery.isNumber(selector) )
        	{
        	   if( tQuery.UiChain("chain")[selector] )
        	   {
        	       this.context = [selector] ;
        	       this.length  = 1 ;
        	       
        	       return this.__findChild( parent ) ;
        	   }
        	}
        	
        	// TODO handle #id 尽量不用正则，优化性能
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
    	 * 获取ti对象，返回数组
    	 */
    	this.__getTiObject  = function()
    	{
    		var ret = new Array();
    		if( this.context )
			{
    			for( var i =0 ; i < this.length ; i++)
				{
    				var obj = this.__getUiChainObject( this.context[i] );
    				if( obj && obj.ti )
					{
    					ret.push( obj.ti );
					}
				}
			}
    		
    		return ret ;
    	};
    	
    	/**
    	 * 获取UiChain 中chain链里的对应tQueryid 对象
    	 */
    	this.__getUiChainObject = function( tQueryid , key )
    	{
    		if( typeof key === "undefined" )
    		{
    			return tQuery.UiChain("chain")[tQueryid] ;
    		}
    		
    		return tQuery.UiChain("chain")[tQueryid][key] ;
    	};

    	/**
    	 * 设置ui chain中chain链里对应tQueryid 对象的值
    	 * @param tQueryid
    	 * @param value
    	 */
    	this.__setUiChainObject = function( tQueryid , key , value )
    	{
    		if( typeof key === "undefined" )
    		{
    			tQuery.console.error( "internal method __setUiChainObject expect params key as valid" );
    			return false ;
    		}
    		
    		tQuery.UiChain("chain")[tQueryid][key] = value ;
    		
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
    	
    	this.open = function()
    	{
    	    if( this.context[0] 
    	        && tQuery.UiChain("chain")[this.context[0]] 
    	        && tQuery.UiChain("chain")[this.context[0]]['ti'] 
    	        && tQuery.UiChain("chain")[this.context[0]]['ti']['open']
    	    )
    	    {
        	    tQuery.UiChain("chain")[this.context[0]]['ti'].open();
    	    }
    	    else
    	    {
    	        tQuery.console.error( tQuery.UiChain("chain")[this.context[0]]['ti'] + 'has no method open ');
    	    }
    	    
    	    return this ;
    	};
    	
    	/**
    	 * 迭代tQuery对象的每一个元素 
    	 * 
    	 */
    	this.each = function(callback)
    	{
    	    if( tQuery.type(callback) !== "function" )
    	    {
    	        tQuery.console.error("method each expect function as params");
    	    }
    	    
    	    // 这里面this指针要指到遍历的对象
    	    // TODO 这个方法内部暂未实现
    	};
    	
    	/**
    	 * 取得其中一个匹配的元素。 num表示取得第几个匹配的元素。
    	 */
    	this.get = function(index)
    	{
    	   index = Number(index) ;
    	   if( this.context[index] ) 
    	   {
    	       return tQuery(this.context[index]) ;
	       }  
    	};
    	
    	/**
    	 * 搜索匹配的元素，并返回相应元素的索引值，从0开始计数。
    	 * 没有匹配到元素返回-1
    	 * 参数obj必须是一个tQuery对象，取context的第一个元素进行查找
    	 */
    	this.index = function( obj )
    	{
    	    if( tQuery.istQueryObject(obj) && obj.context[0] )
    	    {
    	        return tQuery.inArray(obj.context[0] , this.context) ;
    	    }
    	    
    	    return -1 ;
    	};
    	
    	/**
    	 * 在元素上存放数据,返回jQuery对象。
    	 * 可以传入key-value格式的object
    	 */
    	this.data = function( key , value )
    	{
    		if( !key )
			{
    			tQuery.console.error( "method data expect params key as valid");
    			return this ;
			}
    		
    		if( !this.context || this.context.length <= 0 )
    		{
    			return this ;
    		}
    		
    	    if( tQuery.type(key) === "object" )
    	    {
    	        var obj = tQuery.clone(key);

    	        this.context.foreach(function(i , tQueryid ){
    	        	var transObj = tQuery(tQueryid); 
    	        	var to = transObj.__getUiChainObject(tQueryid , 'data' ) || {} ;
    	        	to = tQuery.merge( to  , obj );

    	        	transObj.__setUiChainObject( tQueryid , 'data' , to );
    	        });

    	        return this;
    	    }
    	    
    	    if( typeof value === "undefined" )
    	    {
    	    	// 只支持一个元素取值，这个要有良好的规定，否则造成混乱
    	    	// 默认取第一个元素
    	    	var data = this.__getUiChainObject(this.context[0] , "data" ) || {} ;
	    		return data[key] ;
    	    }

    	    this.context.foreach(function(i , tQueryid  ){
    	    	var transObj = tQuery(tQueryid); 
	        	var to = transObj.__getUiChainObject(tQueryid , 'data' ) || {} ;
	        	to[key] = value ;

	        	transObj.__setUiChainObject( tQueryid , 'data' , to );
	        });

    	    return this;
    	};
    	
    	/**
    	 * 元素上移除存放的数据
    	 * 参数可以是字符串，一维数组或者以空格分隔开的字符串 
    	 * @param {String|Array	}
    	 * @return {tQuery Object}
    	 */
    	this.removeData = function()
    	{
    	    if( !arguments[0] )
    	    {
    	        return false ;
    	    }
    	    
    	    var arr = type = tQuery.type( arguments[0] ) === "string" ? 
    	    		getMulitClass( arguments[0] ) : arguments[0] ; 

    	    var global = this ;
    	    
    	    this.context.foreach(function( i , tQueryid ){
    	    	var data = global.__getUiChainObject(tQueryid, 'data' );
        	    arr.foreach(function(j , ele ){
        	    	if( data[ele] )
    	    		{
        	    		delete data[ele];
    	    		}
        	    });
        	    
        	    global.__setUiChainObject(tQueryid, 'data', data );
    	    });
                        
    	    return this ;
    	};
    	
    	// TODO 队列方法暂未实现
    	this.queue = function(){};
    	this.dequeue = function(){};
    	this.clearQueue = function(){};
    	
    	/**
    	 * 非常重要，设置获取Ti元素的属性全部要通过这个来进行
    	 * 与ti 的ui api紧密相关
    	 * 1.设置的时候需要同步更改ui chain中对应元素的属性，然后调用ti的方法进行设置
		 *   考虑ing，设置的时候是否可以不用关系ui chain中对应元素的属性，对ti对象操作进行设置
    	 * 2.获取需要直接调用ti的方法进行获取
    	 * TODO 不知道能不能这样直接获取还是必须得调用ti对象对应的方法才能获取和设置
    	 */
    	this.attr = function(key , value)
    	{
    		if( !key )
			{
    			return tQuery.console.error( "method attr expect key valid ! passed " + key );
			}

    		if( typeof value === "undefined" )
			{
    			// Get
    			var ret = new Array()	;
    			this.__getTiObject().foreach( function( i , ele	){
    				var obj = {};
    				for( var p in ele)
    				{
    					// 原生属性
    					if( ele.hasOwnPrototype(p) )
    					{
    						obj[p] = ele[p] ;	
    					}
    				}
    				
    				ret.push( obj );
    			});
    			
    			return ret ;
			}
    		
    		// Set mulit
    		if( typeof key === "object" )
    		{
    			var obj = tQuery.clone( key );
				this.__getTiObject().foreach( function(i , ele){
	    			for( var k in obj )
	    			{
	    				ele[k] = obj[k];
	    			}
				} );
    			
    			return this ;
    		}
    		
    		// Set key = value 
			this.__getTiObject().foreach( function( i , ele	){
				ele[key] = value ;
			});

			return this ;
    	};
    	
    	/**
    	 * 删除对象属性
    	 * @param {String} name
    	 * @return {tQuery Object} this
    	 */
    	this.removeAttr = function(name)
    	{
    		if( tQuery.type(name) != 'string' )
    		{
    			return tQuery.console.error("method removeAttr expect params name as string valid ");
    		}
    		
			this.__getTiObject().foreach( function( i , ele	){
				ele[name] = undefined ;
			});

			return this ;
    	};
    	
    	/**
    	 * internal use only 
    	 * @param className
    	 * @param {Boolen} bool add => true ， remove => false 
    	 */
    	this.__setClass = function( className , bool )
    	{
    		var clsData = tQuery.__getStyle({cls:className});
    		this.__getTiObject().foreach( function( i , ele ){
    			for(var p in clsData )
    			{
    				ele[p] = bool ? clsData[p] : undefined ;
    			}
    		});
    		
    		return this ;
    	};
    	
    	/**
    	 * 给元素添加css类名(需要更新元素样式)
    	 * 后添加的，优先级最高，直接覆盖
    	 * @param {String} className 一个或者多个要添加的类名，以空格分隔
    	 */
    	this.addClass = function(className)
    	{
    		className = className || "";
    		if( !className || tQuery.type(className) !== "string" )
    		{
    			tQuery.console.error("medthod addClass expect className as string valid");
    		}

    		// 修改ui chain 对应对象的opt.className 属性 
    		// removeClass ， toggleClass 都需要知道是否有某个className
    		// 重新设置ti对象对应样式的值
    		// TODO 设置css样式是重要的一部分
    		
    		this.context.foreach(function(i , tQueryid ){
    			tQuery.UiChain("chain")[tQueryid]['opt']['className'] += className ;
    		});
    		
    		return this.__setClass( className , true );
    	};
    	
    	/**
    	 * 目前没有想到好的算法，处理class，将对应的class属性直接设为undefined
    	 * @param {String} className
    	 * @return {tQuery Object} 
    	 */
    	this.removeClass = function( className ) 
    	{
    		className = className || "";
    		if( !className || tQuery.type(className) !== "string" )
    		{
    			tQuery.console.error("medthod removeClass expect className as string valid");
    		}
    		
    		// 没有class则不删除，过滤,取交集
    		var cls = "";
    		this.context.foreach(function(i , tQueryid ){
    			cls += tQuery.UiChain("chain")[tQueryid]['opt']['className'] ;
    		});
    		
    		className = tQuery.intersection( tQuery.getMulitClass(cls) ,
    				tQuery.getMulitClass(clsName) ).join( " " );
    		
    		return className ? this.__setClass( className , false ) : this ; 
    	};
    	
    	return this.__construct(selector , parent ) ;

    }
    
};

exports.tQuery = tQuery ;
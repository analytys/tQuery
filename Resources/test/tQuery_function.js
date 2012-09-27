test("对象复制，防止对象引用改变对象的属性" , function(assert){
	
	var emptyObj = {};
	
	deepEqual( tQuery.clone(emptyObj) , emptyObj , 'tQuery.clone(emptyObj) === emptyObj ');
	
	var obj = {
			name : "tocky" ,
	};
	
	deepEqual( tQuery.clone(obj) , obj , 'tQuery.clone(obj) === obj ');
	
	var mixObj = {
		name : "tocky",
		info : {
			table : true ,
			error : [1,2,3,4,5],
			other : {
				last : 200 ,
			}
		}
	};
	
	deepEqual( tQuery.clone(mixObj) , mixObj , 'tQuery.clone(mixObj) === mixObj ');
	
	
	// 修改mixObj 的属性，看看新对象是否跟着改变
	var newObj = tQuery.clone(mixObj) ;
	mixObj.info.error[1] = 9 ;
	
	notDeepEqual( newObj , {
		name : "tocky",
		info : {
			table : true ,
			error : [1,2,3,4,5],
			other : {
				last : 200 ,
			}
		}
	} , 'newObj !== mixObj ' );
	
	var mix2Obj = {
			name : "tocky",
			info : {
				table : true ,
				error : [1,2,3,4,5],
				other : {
					last : 200 ,
				}
			}
		};
	
	var new2Obj = tQuery.clone(mix2Obj);
	mix2Obj.info.other.last = 900 ;
	
	notDeepEqual( new2Obj , mix2Obj , 'new2Obj !== mix2Obj');
	
});

test("tQuery.getMulitClass 切分className",function(){
	   
	   deepEqual( tQuery.getMulitClass("a b c    d   e") , ["a","b","c","d","e"] , 'tQuery.getMulitClass("a b c    d   e") === ["a","b","c","d","e"]' );
	   
	   deepEqual( tQuery.getMulitClass("   bd  en ") ,  ["bd","en"] , ' tQuery.getMulitClass("   bd  en ") ===  ["bd","en"] ');   
	   
	   deepEqual( tQuery.getMulitClass("clsa") , ["clsa"]  , 'tQuery.getMulitClass("clsa") === ["clsa"]' );
	    
	});


test( " 测试数组取交集 tQuery.intersection" , function(){
	
	deepEqual( tQuery.intersection([]) , [] , 'tQuery.intersection([]) === [] ' );
	
	deepEqual( tQuery.intersection() , [] ,'tQuery.intersection() === []' );
	
	deepEqual( tQuery.intersection(true) , [] ,  'tQuery.intersection(true) === []' );
	
	deepEqual( tQuery.intersection([1,2,3]) , [] , 'tQuery.intersection([1,2,3]) === [] ' );
	
	deepEqual( tQuery.intersection([1,2,3] , [4,5,6]) , [] ,  'tQuery.intersection([1,2,3] , [4,5,6]) === []' );
	
	deepEqual( tQuery.intersection([ 1,2,3] , [1,2,6] ) , [1,2] , 'tQuery.intersection([ 1,2,3] , [1,2,6] ) === [1,2]' );
	
	deepEqual( tQuery.intersection([1,2,3,4] , [4,5,6], [1,2,3,4,5]) ,[4] , 'tQuery.intersection([1,2,3,4] , [4,5,6], [1,2,3,4,5]) === [4]' );
	
});


test("变量或者表达式是否为数组",function(assert){
    deepEqual( tQuery.isArray(null) , false , "tQuery.isArray(null) === false");
    
    deepEqual( tQuery.isArray(undefined) , false , 'tQuery.isArray(undefined) === false ');
    
    deepEqual( tQuery.isArray(NaN) , false , 'tQuery.isArray(NaN) === false');
    
    deepEqual( tQuery.isArray("string"), false , 'tQuery.isArray("string") === false ') ;
    
    deepEqual( tQuery.isArray({}) , false , 'tQuery.isArray({}) === false');
    
    deepEqual( tQuery.isArray(100) , false , 'tQuery.isArray(100) === false ' );
    
    deepEqual( tQuery.isArray(10.11) , false , 'tQuery.isArray(10.11) === false ') ;

    deepEqual ( tQuery.isArray(true) , false , 'tQuery.isArray(true) === false');    
    
    deepEqual( tQuery.isArray([]) , true , 'tQuery.isArray([]) === true') ;
    
    deepEqual( tQuery.isArray( new Date() ) , false, 'new Date() ) === false');
    
    deepEqual( tQuery.isArray( function(){} ) , false, 'tQuery.isArray( function(){} ) === false');
    
    deepEqual( tQuery.isArray( /(.*)/) , false , 'tQuery.isArray( /(.*)/) === false');
    
    deepEqual( tQuery.isArray( a = undefined || [] ) , true , 'tQuery.isArray(  a = undefined || [] ) === true ');

});

test("tQuery.isNumber",function(){
	   
	   ok(tQuery.isNumber(1) , 'tQuery.isNumber(1)' );
	   
	   ok(tQuery.isNumber(100001) , 'tQuery.isNumber(100001)' );
	   
	   ok( tQuery.isNumber("10001") , 'tQuery.isNumber("10001")' );
	   
	   ok( !tQuery.isNumber("a") , '!tQuery.isNumber("a")' );
	   
	   ok( !tQuery.isNumber("#3456") , '!tQuery.isNumber("#3456")' );
	   
	   ok( !tQuery.isNumber(".acd43") , '!tQuery.isNumber(".acd43")');
	    
	});


test("变量或者表达式是否为对象",function(assert){
    deepEqual( tQuery.isObject(null) , false , "tQuery.isObject(null) === false");
    
    deepEqual( tQuery.isObject(undefined) , false , 'tQuery.isObject(undefined) === false ');
    
    deepEqual( tQuery.isObject(NaN) , false , 'tQuery.isObject(NaN) === false');
    
    deepEqual( tQuery.isObject("string"), false , 'tQuery.isObject("string") === false ') ;
    
    deepEqual( tQuery.isObject({}) , true , 'tQuery.isObject({}) === true ');
    
    deepEqual( tQuery.isObject(100) , false , 'tQuery.isObject(100) === false ' );
    
    deepEqual( tQuery.isObject(10.11) , false , 'tQuery.isObject(10.11) === false ') ;

    deepEqual ( tQuery.isObject(true) , false , 'tQuery.isObject(true) === false');    
    
    deepEqual( tQuery.isObject([]) , false , 'tQuery.isObject([]) === false') ;
    
    deepEqual( tQuery.isObject( new Date() ) , false, 'new Date() ) === false');
    
    deepEqual( tQuery.isObject( function(){} ) , false, 'tQuery.isObject( function(){} ) === false');
    
    deepEqual( tQuery.isObject( /(.*)/) , false , 'tQuery.isObject( /(.*)/) === false');
    
    deepEqual( tQuery.isObject( a = undefined || {} ) , true , 'tQuery.isObject(  a = undefined || {} ) === true ');

});

test("将第二个obj的属性复制给第一个obj",function(){
    var o = {world : "world"} ;
    var n = {hello : "hello"} ;
    var p = { world : "worldnew" , hello : "hello" };
    
    var s = "";
    var b = 2 ;
    
    var r = tQuery.merge(o,n);
    var e = tQuery.merge(o,p);
    var t = tQuery.merge(s,b);
    
    ok( "world"  === r.world , '"world"  === r.world'   );
    
    ok( "hello" === r.hello , '"hello" === r.hello' );
    
    ok( "worldnew" === e.world , '"worldnew" === e.world' );
    
    ok( typeof t === "object" , 'typeof t === "object"');
    
    ok( typeof t === typeof {} , 'typeof t === typeof {}') ;

    deepEqual( t, {} , "t === {} "  );

    deepEqual( {hello : "hello" , world : "world"} , r , '{hello : "hello" , world : "world"} === r ');
    
    raises( tQuery.merge(1,2) , "ralses tQuery.merge(1,2)" );
});

test("删除字符串2边空格", function (assert) {
	  ok( tQuery.trim("a") === "a" , 'tQuery.trim("a") === "a"');
	  ok( tQuery.trim(" a") === "a", 'tQuery.trim(" a") === "a"' );
	  ok( tQuery.trim("a ") === "a", 'tQuery.trim("a ") === "a"' );
	  ok( tQuery.trim(" a ") === "a", 'tQuery.trim(" a ") === "a"' );
	  ok( tQuery.trim(" sdk app ") === "sdk app" , 'tQuery.trim(" sdk app ") === "sdk app"' );
	  
	  ok( tQuery.trim(true) === "true" , 'tQuery.trim(true) === "true"'   ) ;
});

test("准确的获取变量的类型",function(assert){

    deepEqual( tQuery.type(null) , "null" , "tQuery.type(null) === null");
    
    deepEqual( tQuery.type(undefined) , "undefined" , 'tQuery.type(undefined) === "undefined" ');
    
    deepEqual( tQuery.type(NaN) , "NaN" , 'tQuery.type(NaN) === "NaN"');
    
    deepEqual( tQuery.type("string"), "string" , 'tQuery.type("string") === "string"') ;
    
    deepEqual( tQuery.type({}) , "object" , 'tQuery.type({}) === "object"');
    
    deepEqual( tQuery.type(100) , "number" , 'tQuery.type(100) === "number"' );
    
    deepEqual( tQuery.type(10.11) , "float" , 'tQuery.type(10.11) === "float"') ;

    deepEqual ( tQuery.type(true) , "boolean" , 'tQuery.type(true) === "boolean"');    
    
    deepEqual( tQuery.type([]) , "array" , 'tQuery.type([]) === "array"') ;
    
    deepEqual( tQuery.type( new Date() ) , "date", 'new Date() ) === "date"');
    
    deepEqual( tQuery.type( function(){} ) , "function", 'tQuery.type( function(){} ) === "function"');
    
    deepEqual( tQuery.type( /(.*)/) , "regExp" , 'tQuery.type( /(.*)/) === "regExp"');
});


/**
 * 测试unique 
 */
test( " 测试tQuery.unique  " , function(){
	
	deepEqual( tQuery.unique( [1,2,3,4,5,6,7] ) , [1,2,3,4,5,6,7] , 'tQuery.unique( [1,2,3,4,5,6,7] ) === [1,2,3,4,5,6,7]' );
	
	deepEqual( tQuery.unique( [1,2,3,4,5,6,7,7,2] ) , [ 1, 3, 4, 5, 6, 7, 2 ] , 'tQuery.unique([1,2,3,4,5,6,7,7,2] ) === [ 1, 3, 4, 5, 6, 7, 2 ]' );
	
	deepEqual( tQuery.unique( [1,2,3,3] ) , [1,2,3] , 'tQuery.unique( [1,2,3,3] ) === [1,2,3]' );
	
	deepEqual( tQuery.unique( "a" ) , [] , 'tQuery.unique( "a" ) === []' );
	
	deepEqual( tQuery.unique( true ) , [] , 'tQuery.unique( true ) === []' );
	
	deepEqual( tQuery.unique([]) , [] ,  'tQuery.unique([]) === []' );
	
	deepEqual( tQuery.unique( ["a","b","c","d","a" ] ) , [ 'b', 'c', 'd', 'a' ] , 'tQuery.unique( ["a","b","c","d","a" ] ) === [ "b", "c", "d", "a" ]');
	
	deepEqual( tQuery.unique( ["a","d","c","d","a" ] ) , [ 'c', 'd', 'a' ] , 'tQuery.unique(["a","d","c","d","a" ] ) == [ "c", "d", "a" ]');

});



test(" 测试tQuery.inArray ，确定元素在数组中的位置" , function(){
	
	strictEqual( tQuery.inArray( 1 , [1,2,3,4,5,6] ) , 0 ,  'tQuery.inArray( 1 , [1,2,3,4,5,6] ) === 0' );
	
	strictEqual( tQuery.inArray( 0 , [1,2,3,4,5,6] ) , -1 ,  'tQuery.inArray( 0 , [1,2,3,4,5,6] ) === -1' );
	
	strictEqual( tQuery.inArray( 3 , [1,2,3,4,5,6] ) , 2 ,  'tQuery.inArray( 3 , [1,2,3,4,5,6] ) === 2' );
	
	strictEqual( tQuery.inArray( 1 , []            ) , -1 ,  'tQuery.inArray( 1 , []            ) === -1 ' );
	
	strictEqual( tQuery.inArray( true , true      ) , -1 ,  'tQuery.inArray( true , true      )  ===  -1' );
	
	strictEqual( tQuery.inArray( 0, { "0" : 1 , "1" : 2 } ) , -1 , 'tQuery.inArray( 0, { "0" : 1 , "1" : 2 } ) === -1' );
	
});

test( "判断是否是tQuery对象" , function(){
	
	ok( tQuery.istQueryObject( tQuery() ) 	, 'tQuery.istQueryObject( tQuery() )' );
	
	ok( !tQuery.istQueryObject( {} ) , "!tQuery.istQueryObject( {} )");
	
	ok( !tQuery.istQueryObject( tQuery ) , "!tQuery.istQueryObject( tQuery )");

	
	// 只要是返回tQuery对象的方法，都要在这里测试一遍返回值是否正确
}) ;

test( " tQuery.noConflict " , function(){
	$$ = tQuery.noConflict() ;
	strictEqual(  typeof $$  , "function" , 'typeof tQuery.noConflict() === "object"');
});


test( "tQuery.clear " , function(){
    // 测试清空ui chain
    tQuery.clear();
    
    deepEqual( tQuery.UiChain("tag") , undefined , 'clear tQuery.UiChain("tag") === undefined '  );
    deepEqual( tQuery.UiChain("cls") , undefined  , 'clear tQuery.UiChain("cls") === undefined '  );
    deepEqual( tQuery.UiChain("id") , undefined , 'clear tQuery.UiChain("id") === undefined '  );
    deepEqual( tQuery.UiChain("chain") , undefined , 'clear tQuery.UiChain("chain") === undefined '  );
    deepEqual( tQuery.UiChain("tQueryid") ,  9999 , 'tQuery.UiChain("tQueryid") ===  9999'  );

});


test( "t Array.prototype.foreach" , function(){
	
	var ret = new Array();
	[1,2,3,4,5].foreach(function(i , ele ){
		ret.push( 10 + ele );
	});
	
	deepEqual( ret , new Array(11,12,13,14,15) , 'ret === new Array([11,12,13,14,15)');
	
});


test( "tQuery.data" , function(){
	
	ok( tQuery.istQueryObject( tQuery.data( null , "key" , "value") ) , 
			'tQuery.istQueryObject( tQuery.data( null , "key" , "value") )' );
	
	ok( tQuery.istQueryObject( tQuery.data( tQuery() , undefined , "hello" ) ) ,
			'tQuery.istQueryObject( tQuery.data( tQuery() , undefined , "hello" ) )' );

	ok( tQuery.istQueryObject( tQuery.data( tQuery() , undefined , undefined ) ) , 
			'tQuery.istQueryObject( tQuery.data( tQuery() , undefined , undefined ) )');
	
	tQuery.data( tQuery( {type:"Window", id : "win" } ) , "m" , 110 ); 
	strictEqual(  tQuery("#win").data("m") , 110  , 'tQuery("#win").data("m") === 110' ); 

	tQuery.data( tQuery( {type:"Window", id : "main" } ) , {m : 1, n :2} ); 
	strictEqual(  tQuery("#main").data("m") , 1  , 'tQuery("#win").data("m") === 1 ' );
	strictEqual(  tQuery("#main").data("n") , 2  , 'tQuery("#win").data("n") === 2 '  );
	strictEqual( tQuery("Window").data("m") , 110 , 'tQuery("Window").data("m") === 110 '  );
//	console.log( tQuery.UiChain("chain"))	;

});

test( "tQuery.less " , function(){
	
	tQuery.less.render('.class { width: 1 + 1 }', function (e, css) {
	    equal( css , '.class { width: 2 }');
		//console.log(css);
	});
	
});


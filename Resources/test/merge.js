test("将第二个obj的属性复制给第一个obj",function(){
    var o = {world : "world"} ;
    var n = {hello : "hello"} ;
    var p = { world : "worldnew" , hello : "hello" };
    
    var s = "";
    var b = 2 ;
    
    var r = merge(o,n);
    var e = merge(o,p);
    var t = merge(s,b);
    
    ok( "world"  === r.world , '"world"  === r.world'   );
    
    ok( "hello" === r.hello , '"hello" === r.hello' );
    
    ok( "worldnew" === e.world , '"worldnew" === e.world' );
    
    ok( typeof t === "object" , 'typeof t === "object"');
    
    ok( typeof t === typeof {} , 'typeof t === typeof {}') ;
    deepEqual( t, {} , "t === {} "  );
    deepEqual( {hello : "hello" , world : "world"} , r , '{hello : "hello" , world : "world"} === r ');
    
    raises( merge(1,2) , "ralses merge(1,2)" );
    
});

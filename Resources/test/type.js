test("准确的获取变量的类型",function(assert){

    deepEqual( type(null) , "null" , "type(null) === null");
    
    deepEqual( type(undefined) , "undefined" , 'type(undefined) === "undefined" ');
    
    deepEqual( type(NaN) , "NaN" , 'type(NaN) === "NaN"');
    
    deepEqual( type("string"), "string" , 'type("string") === "string"') ;
    
    deepEqual( type({}) , "object" , 'type({}) === "object"');
    
    deepEqual( type(100) , "number" , 'type(100) === "number"' );
    
    deepEqual( type(10.11) , "float" , 'type(10.11) === "float"') ;

    deepEqual ( type(true) , "boolean" , 'type(true) === "boolean"');    
    
    deepEqual( type([]) , "array" , 'type([]) === "array"') ;
    
    deepEqual( type( new Date() ) , "date", 'new Date() ) === "date"');
    
    deepEqual( type( function(){} ) , "function", 'type( function(){} ) === "function"');
    
    deepEqual( type( /(.*)/) , "regExp" , 'type( /(.*)/) === "regExp"');
    
});

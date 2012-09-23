test("变量或者表达式是否为对象",function(assert){
    deepEqual( isObject(null) , false , "isObject(null) === false");
    
    deepEqual( isObject(undefined) , false , 'isObject(undefined) === false ');
    
    deepEqual( isObject(NaN) , false , 'isObject(NaN) === false');
    
    deepEqual( isObject("string"), false , 'isObject("string") === false ') ;
    
    deepEqual( isObject({}) , true , 'isObject({}) === true ');
    
    deepEqual( isObject(100) , false , 'isObject(100) === false ' );
    
    deepEqual( isObject(10.11) , false , 'isObject(10.11) === false ') ;

    deepEqual ( isObject(true) , false , 'isObject(true) === false');    
    
    deepEqual( isObject([]) , false , 'isObject([]) === false') ;
    
    deepEqual( isObject( new Date() ) , false, 'new Date() ) === false');
    
    deepEqual( isObject( function(){} ) , false, 'isObject( function(){} ) === false');
    
    deepEqual( isObject( /(.*)/) , false , 'isObject( /(.*)/) === false');
    
    deepEqual( isObject( a = undefined || {} ) , true , 'isObject(  a = undefined || {} ) === true ');

});
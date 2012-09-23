test("变量或者表达式是否为数组",function(assert){
    deepEqual( isArray(null) , false , "isArray(null) === false");
    
    deepEqual( isArray(undefined) , false , 'isArray(undefined) === false ');
    
    deepEqual( isArray(NaN) , false , 'isArray(NaN) === false');
    
    deepEqual( isArray("string"), false , 'isArray("string") === false ') ;
    
    deepEqual( isArray({}) , false , 'isArray({}) === false');
    
    deepEqual( isArray(100) , false , 'isArray(100) === false ' );
    
    deepEqual( isArray(10.11) , false , 'isArray(10.11) === false ') ;

    deepEqual ( isArray(true) , false , 'isArray(true) === false');    
    
    deepEqual( isArray([]) , true , 'isArray([]) === true') ;
    
    deepEqual( isArray( new Date() ) , false, 'new Date() ) === false');
    
    deepEqual( isArray( function(){} ) , false, 'isArray( function(){} ) === false');
    
    deepEqual( isArray( /(.*)/) , false , 'isArray( /(.*)/) === false');
    
    deepEqual( isArray( a = undefined || [] ) , true , 'isArray(  a = undefined || [] ) === true ');

});
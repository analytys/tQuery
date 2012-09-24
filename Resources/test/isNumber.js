test("isNumber",function(){
   
   ok(isNumber(1) , 'isNumber(1)' );
   
   ok(isNumber(100001) , 'isNumber(100001)' );
   
   ok( isNumber("10001") , 'isNumber("10001")' );
   
   ok( !isNumber("a") , '!isNumber("a")' );
   
   ok( !isNumber("#3456") , '!isNumber("#3456")' );
   
   ok( !isNumber(".acd43") , '!isNumber(".acd43")');
    
});

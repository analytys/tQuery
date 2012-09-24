test("getMulitClass 切分className",function(){
   
   deepEqual( getMulitClass("a b c    d   e") , ["a","b","c","d","e"] , 'getMulitClass("a b c    d   e") === ["a","b","c","d","e"]' );
   
   deepEqual( getMulitClass("   bd  en ") ,  ["bd","en"] , ' getMulitClass("   bd  en ") ===  ["bd","en"] ');   
   
   deepEqual( getMulitClass("clsa") , ["clsa"]  , 'getMulitClass("clsa") === ["clsa"]' );
    
});

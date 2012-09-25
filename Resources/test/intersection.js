/**
 * 测试数组取交集
 * 
 *  
 *  
 */

test( " 测试数组取交集 intersection" , function(){
	
	deepEqual( intersection([]) , [] , 'intersection([]) === [] ' );
	
	deepEqual( intersection() , [] ,'intersection() === []' );
	
	deepEqual( intersection(true) , [] ,  'intersection(true) === []' );
	
	deepEqual( intersection([1,2,3]) , [] , 'intersection([1,2,3]) === [] ' );
	
	deepEqual( intersection([1,2,3] , [4,5,6]) , [] ,  'intersection([1,2,3] , [4,5,6]) === []' );
	
	deepEqual( intersection([ 1,2,3] , [1,2,6] ) , [1,2] , 'intersection([ 1,2,3] , [1,2,6] ) === [1,2]' );
	
	deepEqual( intersection([1,2,3,4] , [4,5,6], [1,2,3,4,5]) ,[4] , 'intersection([1,2,3,4] , [4,5,6], [1,2,3,4,5]) === [4]' );
	
});
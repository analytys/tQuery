/**
 * 测试unique 
 */

test( " 测试unique  " , function(){
	
	deepEqual( unique( [1,2,3,4,5,6,7] ) , [1,2,3,4,5,6,7] , 'unique( [1,2,3,4,5,6,7] ) === [1,2,3,4,5,6,7]' );
	
	deepEqual( unique( [1,2,3,4,5,6,7,7,2] ) , [ 1, 3, 4, 5, 6, 7, 2 ] , 'unique([1,2,3,4,5,6,7,7,2] ) === [ 1, 3, 4, 5, 6, 7, 2 ]' );
	
	deepEqual( unique( [1,2,3,3] ) , [1,2,3] , 'unique( [1,2,3,3] ) === [1,2,3]' );
	
	deepEqual( unique( "a" ) , [] , 'unique( "a" ) === []' );
	
	deepEqual( unique( true ) , [] , 'unique( true ) === []' );
	
	deepEqual( unique([]) , [] ,  'unique([]) === []' );
	
	deepEqual( unique( ["a","b","c","d","a" ] ) , [ 'b', 'c', 'd', 'a' ] , 'unique( ["a","b","c","d","a" ] ) === [ "b", "c", "d", "a" ]');
	
	deepEqual( unique( ["a","d","c","d","a" ] ) , [ 'c', 'd', 'a' ] , 'unique(["a","d","c","d","a" ] ) == [ "c", "d", "a" ]');

});
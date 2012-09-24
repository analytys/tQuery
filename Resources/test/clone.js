/**
 * 测试clone函数
 */

test("对象复制，防止对象引用改变对象的属性" , function(assert){
	
	var emptyObj = {};
	
	deepEqual( clone(emptyObj) , emptyObj , 'clone(emptyObj) === emptyObj ');
	
	var obj = {
			name : "tocky" ,
	};
	
	deepEqual( clone(obj) , obj , 'clone(obj) === obj ');
	
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
	
	deepEqual( clone(mixObj) , mixObj , 'clone(mixObj) === mixObj ');
	
	
	// 修改mixObj 的属性，看看新对象是否跟着改变
	var newObj = clone(mixObj) ;
	mixObj.info.error[1] = 9 ;
	
	notDeepEqual( newObj , mixObj , 'newObj !== mixObj ' );
	
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
	
	var new2Obj = clone(mix2Obj);
	mix2Obj.info.other.last = 900 ;
	
	notDeepEqual( new2Obj , mix2Obj , 'new2Obj !== mix2Obj');
	
});
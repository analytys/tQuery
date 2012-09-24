/**
 * test tQuery
 */

test("tQuery framework" , function(){
	
	var opt = {
		type: "Page" ,	
	};
	
	tQuery(opt) ; 
	
	var rChain = {
			tag : {
				Page : [10000]
			},
			chain : {
				10000 : {
					parent : "" ,
					opt : {
						type : "Page" ,
					},
					children : [] ,
					event : {}
				}
			}
	};
	
	//  添加单个page
	deepEqual( tQuery.UiChain("id") , {} , 'opt1 with rchain1 id'  );
	deepEqual( tQuery.UiChain("cls") , {} , 'opt1 with rchain1  cls'  );
	deepEqual( tQuery.UiChain("tag") , rChain.tag , 'opt1 with rchain1 tag'  );
	deepEqual( tQuery.UiChain("chain") , rChain.chain , 'opt1 with rchain1 chain'  );
	
	// 测试单个Window
	var rChain2 = {
			tag : {
				Page : [10000,10002],
				Window : [10003],
				
			},
			chain : {
				10000 : {
					parent : "" ,
					children : [] ,
					event : {},
					opt : {
						type : "Page" ,
					},
				},
				10002 : {
					parent : "" ,
					children : [ 10003 ] ,
					event : {},
					opt : {
						type : "Page" ,
					},
				},
				10003 : {
					parent : 10002 ,
					children : [] ,
					event : {},
					opt : {
						type : "Window",
					},
				}
			}
	};
	
	var opt2 = {
			"type" : "Window",
	};
	tQuery(opt2) ;
	
	deepEqual( tQuery.UiChain("tag") , rChain2.tag , 'opt2 with rchain2 tag'  );
	deepEqual( tQuery.UiChain("chain") , rChain2.chain , 'opt2 with rchain2 chain'  );
	
	
	// 添加cls 和 id
	var opt3 = {
			type : "View" ,
			cls : "normal",
			id : "register",
			children : [
		            {
		            	type : "Button",
		            	className : "bc",
		            	id : "bc" ,
		            	text : "hello",
		            },
		            {
		            	type : "Label",
		            	"class" : "lb",
		            },
		            {
		            	type : "Label",
		            	"class" : "lb  fb",
		            	id : "lb2" ,
		            	event : {
		            	    click : function(){} ,
		            	    dblclick : function(){},
		            	},
		            	mouseover : function(){} ,
		            }
			            ]
	};
	
	var rChain3 = {
			tag : {
				Page : [10000,10002 , 10005],
				Window : [10003],
				View : [10006] ,
				Button : [10007],
				Label : [10008,10009] ,
			},
			cls : {
				normal : [10006],
				bc : [ 10007 ],
				lb : [ 10008 , 10009 ],
				fb : [10009] ,
			},
			id : {
				register : [ 10006 ], 
				bc : [ 10007 ],
				lb2 : [ 10009 ],
			},
			chain : {
				10000 : {
					parent : "" ,
					children : [] ,
					event : {},
					opt : {
						type : "Page" ,
					},
				},
				10002 : {
					parent : "" ,
					children : [ 10003 ] ,
					event : {},
					opt : {
						type : "Page" ,
					},
				},
				10003 : {
					parent : 10002 ,
					children : [] ,
					event : {},
					opt : {
						type : "Window",
					},
				},
				10005: {
				     parent: '', 
				     children: [ 10006 ] ,
				     event : {},
				     opt: { 
				         type: 'Page' 
				     }, 
				},
				10006 : {
					parent : 10005,
					children : [ 10007 , 10008 , 10009] ,
					event : {},
					opt : {
						type : "View" ,
						cls : "normal",
						id : "register",
					},
				},
				10007 : {
					parent : 10006 ,
					children : [  ] ,
					event : {}, 
					opt : {
						type : "Button" ,
		            	className : "bc",
		            	id : "bc" ,
		            	text : "hello",
					},
				},
				10008 : {
					parent : 10006,
					children : [   ] ,
					event : {},
					opt : {
						type : "Label" ,
		            	"class" : "lb",
					},
				},
				10009 : {
					parent : 10006,
					children : [   ] ,
					event : {
					    click : function(){} ,
                        dblclick : function(){},
                        mouseover : function(){} ,
					},
					opt : {
						type : "Label" ,
		            	"class" : "lb  fb",
		            	id : "lb2" ,
					},
				},
				
			}
	};
	
	var ret = tQuery(opt3);
	
	deepEqual( tQuery.UiChain("tag") , rChain3.tag , 'opt3 with rchain3 tag'  );
	deepEqual( tQuery.UiChain("cls") , rChain3.cls , 'opt3 with rchain3 cls'  );
	deepEqual( tQuery.UiChain("id") , rChain3.id , 'opt3 with rchain3 id'  );
	// deepEqual( tQuery.UiChain("chain") , rChain3.chain , 'opt3 with rchain3 chain'  ); // event 对像中含有函数，断言会失败	for(var i in tQuery.UiChain("chain") )
	{
	    console.log( tQuery.UiChain("chain")[i]['event'] , rChain3.chain[i]['event'] ) ;
	    delete tQuery.UiChain("chain")[i]['event'];
	    delete rChain3.chain[i]['event'];
	    deepEqual( tQuery.UiChain("chain")[i] , rChain3.chain[i] , i  );
	}
    // console.log(ret);
    
    // 测试清空ui chain
    tQuery.clear();
    
    deepEqual( tQuery.UiChain("tag") , {}, 'clear tQuery.UiChain("tag") === {}'  );
    deepEqual( tQuery.UiChain("cls") , {}, 'clear tQuery.UiChain("cls") === {}'  );
    deepEqual( tQuery.UiChain("id") , {}, 'clear tQuery.UiChain("id") === {}'  );
    deepEqual( tQuery.UiChain("chain") , {}, 'clear tQuery.UiChain("chain") === {}'  );
    // 测试第二个参数为父对象
	
	
});
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
					opt : {
						type : "Page" ,
					},
					children : [] ,
				},
				10002 : {
					parent : "" ,
					opt : {
						type : "Page" ,
					},
					children : [ 10003 ] ,
				},
				10003 : {
					parent : 10002 ,
					opt : {
						type : "Window",
					},
					children : [] ,
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
					opt : {
						type : "Page" ,
					},
					children : [] ,
				},
				10002 : {
					parent : "" ,
					opt : {
						type : "Page" ,
					},
					children : [ 10003 ] ,
				},
				10003 : {
					parent : 10002 ,
					opt : {
						type : "Window",
					},
					children : [] ,
				},
				10006 : {
					parent : "",
					opt : {
						type : "View" ,
						cls : "normal",
						id : "register",
					},
					children : [ 10007 , 10008 , 10009] ,
				},
				10007 : {
					parent : 10006 ,
					opt : {
						type : "Button" ,
		            	className : "bc",
		            	id : "bc" ,
		            	text : "hello",
					},
					children : [  ] ,
				},
				10008 : {
					parent : 10006,
					opt : {
						type : "Label" ,
		            	"class" : "lb",
					},
					children : [   ] ,
				},
				10009 : {
					parent : 10006,
					opt : {
						type : "Label" ,
		            	"class" : "lb",
		            	id : "lb2" ,
					},
					children : [   ] ,
				},
				
			}
	};
	
	
	tQuery(opt3);
	
	deepEqual( tQuery.UiChain("tag") , rChain3.tag , 'opt3 with rchain3 tag'  );
	deepEqual( tQuery.UiChain("cls") , rChain3.cls , 'opt3 with rchain3 cls'  );
	deepEqual( tQuery.UiChain("id") , rChain3.id , 'opt3 with rchain3 id'  );
	deepEqual( tQuery.UiChain("chain") , rChain3.chain , 'opt3 with rchain3 chain'  );

	
	
	
});
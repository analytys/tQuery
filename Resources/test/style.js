test("给UI元件添加类css样式的属性",function(assert){
    
    var css = {
        
        username : {
                backgroundColor:"#ggghhh",
                color:"#333333",
                width:100
        },
        
        password : {
                height:300 
        }
        
    };

    var opt = {
        id : "username",
        title : "title",
    };
    
    var ret = {
        id : "username",
        title : "title",
        backgroundColor:"#ggghhh",
        color:"#333333",
        width:100
    };
        
    deepEqual( style(opt,css) , ret , " ret === style(opt,css) " );
    
    deepEqual( style(opt, "" ) , opt , 'style(opt, "" ) === opt ');
    
    deepEqual( style("opt", "" ) , {} , 'style("opt", "" ) === {} ');
    
    deepEqual( style( [] , css ) , {} , 'style([], css ) === {} ');
    
});

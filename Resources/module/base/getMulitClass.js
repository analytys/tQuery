var trim = require("./trim").trim ;

function getMulitClass(str)
{
    str = new String(str);
    
    if( str.indexOf(" ") === -1 )
    {
        return [str];
    }
    
    var ret = [];
    var arr = str.split(" ");
    for(var i =0 , len = arr.length ;i < len ;i++ )
    {
        if( trim(arr[i]).length <= 0  )
        {
            continue ;
        }
        
        ret.push(arr[i]);
    }
    
    return ret ;
}

exports.getMulitClass = getMulitClass  ; 

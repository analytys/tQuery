var type = require("./type").type ;

/**
 * 判断是否纯整型数字
 * @param {Number|String} number
 */
function isNumber(number)
{
    if( type(number) === 'number' )
    {
        return true ;
    }
    
    var a = number ;
    number = Number(number);
    
    return a == number && /^\d+$/.test(number);
};

exports.isNumber = isNumber ;

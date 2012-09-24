var type = require("./type").type ;

/**
 * 删除字符串2边空格 
 * @param {String} str
 * @return {String} 
 */
function trim(str) 
{
    str = new String(str) ;
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

exports.trim = trim  ;
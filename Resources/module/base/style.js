var trim  = require("./trim").trim ;
var merge = require("./merge").merge ;
var type  = require("./type").type ;

/**
 * 给UI元件添加类css样式
 * @param {Object} opt
 * @param {Object} css
 * @return {Object}
 */
exports.style = function(opt , css )
{
    opt = type( opt ) === "object" ? opt : {} ;
    css = type( css ) === "object" ? css : {} ;
    var id = opt.hasOwnProperty("id")  && trim(opt.id).length > 0 ? opt.id : false ;
    
    return id ? ( id in css ? merge( opt, css[id] ) : opt ) : opt ;
};
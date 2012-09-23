var type = require("./type").type ;

exports.isObject = function(obj)
{
    return type(obj) === "object" ;
}

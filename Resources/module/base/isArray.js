var type = require("./type").type ;

exports.isArray = function(array)
{
    return type(array) === "array" ;
}

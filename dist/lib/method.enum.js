"use strict";
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
/**
 * define available HTTP METHOD
 */
var METHOD;
(function (METHOD) {
    METHOD["GET"] = "GET";
    METHOD["POST"] = "POST";
    METHOD["PUT"] = "PUT";
    METHOD["PATCH"] = "PATCH";
    METHOD["DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
module.exports = METHOD;
//# sourceMappingURL=method.enum.js.map
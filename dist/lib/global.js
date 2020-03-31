"use strict";
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
function toQueryString(data) {
    return Object.keys(data).map(function (key) { return key + "=" + encodeURIComponent(data[key]); }).join('&');
}
module.exports = { toQueryString: toQueryString };
//# sourceMappingURL=global.js.map
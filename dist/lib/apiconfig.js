"use strict";
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
var ApiConfig = /** @class */ (function () {
    function ApiConfig(baseUrl) {
        if (baseUrl === void 0) { baseUrl = ''; }
        Object.defineProperty(this, "baseURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "https://api.keyos.id/rest"
        });
        Object.defineProperty(this, "method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "responseType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        }); // 10 seconds
        Object.defineProperty(this, "onUploadProgress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function () { }
        });
        this.baseURL = baseUrl || this.baseURL;
    }
    return ApiConfig;
}());
module.exports = ApiConfig;
//# sourceMappingURL=apiconfig.js.map
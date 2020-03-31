"use strict";
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
var ApiConfig = require("./apiconfig");
var METHOD = require("./method.enum");
var ApiRequest = /** @class */ (function () {
    function ApiRequest() {
        Object.defineProperty(this, "_method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: METHOD.GET
        });
        Object.defineProperty(this, "_path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "_api_key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "_body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "_query", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
    }
    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
     * @private
     */
    Object.defineProperty(ApiRequest.prototype, "_toQueryString", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            return Object.keys(data).map(function (key) { return key + "=" + encodeURIComponent(data[key]); }).join('&');
        }
    });
    /**
     * set path for api call
     * @param path
     */
    Object.defineProperty(ApiRequest.prototype, "setPath", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (path) {
            this._path = path;
            return this;
        }
    });
    /**
     * set request body for this api call
     * @param body object {key:value}
     */
    Object.defineProperty(ApiRequest.prototype, "setRequestBody", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (body) {
            this._body = body;
            return this;
        }
    });
    /**
     * set method for this api call
     * @param method
     */
    Object.defineProperty(ApiRequest.prototype, "setMethod", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (method) {
            this._method = method;
            return this;
        }
    });
    /**
     * set query parameter (typically in url) for this api call
     * @param query object {key:value}
     */
    Object.defineProperty(ApiRequest.prototype, "setRequestQuery", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (query) {
            this._query = query;
            return this;
        }
    });
    /**
     * set api key for this api call
     * @param api_key
     */
    Object.defineProperty(ApiRequest.prototype, "setApiKey", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (api_key) {
            this._api_key = api_key;
            return this;
        }
    });
    /**
     * Get Config for fetch data
     */
    Object.defineProperty(ApiRequest.prototype, "getConfig", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var headers = {
                'key': this._api_key,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            var apiConfig = new ApiConfig();
            apiConfig.url = this._path;
            apiConfig.method = this._method;
            apiConfig.headers = headers;
            apiConfig.data = this._toQueryString(this._body);
            apiConfig.params = this._query;
            return apiConfig;
        }
    });
    return ApiRequest;
}());
module.exports = ApiRequest;
//# sourceMappingURL=apirequest.js.map
"use strict";
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
var ApiConfig = require("./apiconfig");
var ApiRequest = /** @class */ (function () {
    function ApiRequest() {
        Object.defineProperty(this, "_base_url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_method", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "GET"
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
        Object.defineProperty(this, "_headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "_form_type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "application/x-www-form-urlencoded"
        });
        Object.defineProperty(this, "_on_upload_progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: function () { }
        });
    }
    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
     * @param prefix
     * @private
     */
    Object.defineProperty(ApiRequest.prototype, "_toQueryString", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data, prefix) {
            if (prefix === void 0) { prefix = null; }
            // return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
            var str = [], p;
            for (p in data) {
                if (data.hasOwnProperty(p)) {
                    var k = prefix ? prefix + "[" + "]" : p, v = data[p];
                    str.push((v !== null && typeof v === "object") ?
                        this._toQueryString(v, k) :
                        encodeURIComponent(k) + "=" + encodeURIComponent(v));
                }
            }
            return str.join("&");
        }
    });
    /**
     * set request headers
     * @param headers
     */
    Object.defineProperty(ApiRequest.prototype, "setHeaders", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (headers) {
            this._headers = headers;
            return this;
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
     * Set Base URL For this API
     *
     * @param url
     */
    Object.defineProperty(ApiRequest.prototype, "setBaseURL", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (url) {
            this._base_url = url;
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
     * Set form data (for upload purposes)
     * @param data
     */
    Object.defineProperty(ApiRequest.prototype, "setFormData", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (data) {
            this._form_type = 'multipart/form-data';
            this._body = data;
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
     * on upload progress
     */
    Object.defineProperty(ApiRequest.prototype, "onUploadProgress", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (cb) {
            this._on_upload_progress = cb;
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
            var _this = this;
            var headers = {
                'key': this._api_key,
                'Accept': 'application/json',
                'Content-Type': this._form_type
            };
            Object.keys(this._headers).forEach(function (key) {
                // dont know why this getting error ??
                // @ts-ignore
                headers[key] = _this._headers[key];
            });
            var apiConfig = new ApiConfig(this._base_url);
            apiConfig.url = this._path;
            apiConfig.method = this._method;
            apiConfig.headers = headers;
            if (this._form_type !== 'multipart/form-data') {
                if (typeof this._body === 'object') {
                    apiConfig.data = this._toQueryString(this._body);
                }
                else if (typeof this._body === 'string') {
                    apiConfig.data = this._body;
                }
            }
            else {
                apiConfig.data = this._body;
            }
            apiConfig.params = this._query;
            apiConfig.onUploadProgress = this._on_upload_progress;
            return apiConfig;
        }
    });
    return ApiRequest;
}());
module.exports = ApiRequest;
//# sourceMappingURL=apirequest.js.map
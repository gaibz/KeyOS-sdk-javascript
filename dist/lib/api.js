"use strict";
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
var mod = require("./require.node");
var global = require("./global");
var axios = mod.axios;
var Api = /** @class */ (function () {
    function Api() {
        Object.defineProperty(this, "api_key", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
    }
    /**
     * Process response from http, if success === false then reject promise
     *
     * @param response
     * @param resolve
     * @param reject
     */
    Object.defineProperty(Api.prototype, "_processResponse", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (response, resolve, reject) {
            var resp = {
                status: {
                    code: response.status,
                    text: response.statusText
                },
                body: response.data,
                _request: response.request,
                _headers: response.headers,
                getBody: function () {
                    return this.body;
                },
                getStatusCode: function () {
                    return this.status.code;
                },
                getStatusText: function () {
                    return this.status.text;
                }
            };
            if (resp.body.success === false) {
                reject(resp);
            }
            resolve(resp);
        }
    });
    /**
     * Process Error from api call
     *
     * @param error
     * @param reject
     */
    Object.defineProperty(Api.prototype, "_processError", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (error, reject) {
            var err = {
                status: {
                    code: error.response.status,
                    text: error.response.statusText,
                },
                body: error.response.data,
                _request: error.response.request,
                _headers: error.response.headers,
                getBody: function () {
                    return this.body;
                },
                getStatusCode: function () {
                    return this.status.code;
                },
                getStatusText: function () {
                    return this.status.text;
                }
            };
            if (err.body === '') {
                err.body = {
                    success: false,
                    message: "Something goes wrong",
                };
            }
            reject(err);
        }
    });
    /**
     * Backward compatibility
     *
     * @param key
     */
    Object.defineProperty(Api.prototype, "setApiKey", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (key) {
            this.api_key = key;
            return this;
        }
    });
    /**
     * call api directly (backward compatibility)
     *
     * @param method string GET,POST,PUT,PATCH,DELETE
     * @param path string path
     * @param request_parameter
     * @param request_body
     */
    Object.defineProperty(Api.prototype, "action", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (method, path, request_parameter, request_body) {
            var _this = this;
            if (path === void 0) { path = ""; }
            if (request_parameter === void 0) { request_parameter = {}; }
            if (request_body === void 0) { request_body = {}; }
            // @ts-ignore
            return new Promise(function (resolve, reject) {
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'key': _this.api_key
                };
                if (_this.api_key) {
                    headers.key = _this.api_key;
                }
                var config = {
                    baseURL: 'https://api.keyos.id/rest',
                    timeout: 10000,
                    headers: headers,
                    url: path,
                    method: method,
                    params: request_parameter,
                    data: global.toQueryString(request_body),
                    responseType: 'json'
                };
                axios(config).then(function (response) {
                    _this._processResponse(response, resolve, reject);
                }).catch(function (error) {
                    _this._processError(error, reject);
                });
            });
        }
    });
    /**
     * Call api (new method)
     *
     * @param request
     */
    Object.defineProperty(Api.prototype, "call", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (request) {
            var _this = this;
            // @ts-ignore
            return new Promise(function (resolve, reject) {
                axios(request.getConfig()).then(function (response) {
                    _this._processResponse(response, resolve, reject);
                }).catch(function (error) {
                    _this._processError(error, reject);
                });
            });
        }
    });
    return Api;
}());
module.exports = Api;
//# sourceMappingURL=api.js.map
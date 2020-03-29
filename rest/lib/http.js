/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const Axios = require("axios");
const querystring = require("querystring");

/**
 * Http class for calling to keyos server
 */
class Http {

    /**
     * Set properties
     */
    _setProperties() {
        this.base_api_url = "https://api.keyos.id/rest";
        this.path = "";
        this.api_key = '';
        this._response = {};
    }

    /**
     * constructor
     */
    constructor() {
        this._setProperties();
    }

    /**
     * set api path
     *
     * @param path string
     */
    setPath(path) {
        this.path = path;
    }

    setApiKey(key) {
        this.api_key = key;
    }

    getCompleteUrl() {
        return this.base_api_url + '/' + this.path;
    }

    /**
     * call http api with defined method
     *
     * @param method string GET,POST,PUT,PATCH,DELETE
     * @param path string path
     * @param request_parameter
     * @param request_body
     */
    action(method, path="", request_parameter = {}, request_body = {}) {
        this.setPath(path);
        return new Promise((resolve, reject) => {
            let headers = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'gzip, deflate, br'
            };

            if(this.api_key) {
                headers.key = this.api_key
            }

            let config = {
                baseURL : this.base_api_url,
                timeout : 10000,
                headers,
                url: this.path,
                method: method,
                params: request_parameter,
                data: querystring.stringify(request_body),
                responseType: 'json'
            };

            Axios(config).then((response) => {
                this._processResponse(response, resolve, reject);
            }).catch((error) => {
                this._processError(error, reject);
            });
        });
    }

    /**
     * Process response from http, if success === false then reject promise
     *
     * @param response
     * @param resolve
     * @param reject
     */
    _processResponse(response, resolve, reject) {
        let resp = {
            status : {
                code : response.status,
                text : response.statusText
            },
            body: response.data,

            _request: response.request,
            _headers: response.headers,

            getBody: function(){
                return this.body;
            },
            getStatusCode: function(){
                return this.status.code;
            },
            getStatusText: function(){
                return this.status.text;
            }
        };

        if(resp.body.success === false) {
            reject(resp);
        }
        resolve(resp);
    }

    /**
     * Process Error from api call
     *
     * @param error
     * @param reject
     */
    _processError(error, reject) {
        let err = {
            status : {
                code: error.response.status,
                text: error.response.statusText,
            },
            body: error.response.data,
            
            _request: error.response.request,
            _headers: error.response.headers,

            getBody: function(){
                return this.body;
            },
            getStatusCode: function(){
                return this.status.code;
            },
            getStatusText: function(){
                return this.status.text;
            }
        };

        if(err.body === '') {
            err.body = {
                success: false,
                message: "Something goes wrong",
            }
        }

        reject(err);
    }
}

module.exports = Http;
/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

'use strict';

const Axios = require("axios");

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
     * Get HTTP Driver / Axios instance
     *
     * @returns {AxiosInstance}
     */
    _getDriver() {
        let headers = {};

        if(this.api_key) {
            headers.key = this.api_key
        }

        return Axios.create({
            baseURL : this.base_api_url,
            timeout : 10000,
            headers,
        });
    }

    /**
     * call http api with defined method
     *
     * @param method string GET,POST,PUT,PATCH,DELETE
     * @param path string path
     * @param query object of query string parameter
     * @param body object of request body
     */
    action(method, path="", query = {}, body = {}) {
        this.setPath(path);
        return new Promise((resolve, reject) => {
            let driver = this._getDriver();
            let config = {
                url: this.path,
                method: method,
                params: query,
                data: body,
                responseType: 'json'
            };
            driver.request(config).then((response) => {
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
        };

        if(err.body === '') {
            err.body = {
                success: false,
                message: "Not Found",
            }
        }

        reject(err);
    }
}

module.exports = Http;
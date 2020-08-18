/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

import ApiConfig = require('./apiconfig');
import METHOD = require('./method.enum');

class ApiRequest {

    private _method : METHOD = METHOD.GET;

    private _path : string = "";
    private _api_key : string = "";

    private _body : object = {};
    private _query : object = {};

    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
     * @param prefix
     * @private
     */
    private _toQueryString(data : any, prefix : any = null) : string {
        // return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
        let str = [], p;
        for (p in data) {
            if (data.hasOwnProperty(p)) {
                let k = prefix ? prefix + "[" + p + "]" : p,
                    v = data[p];
                str.push((v !== null && typeof v === "object") ?
                    this._toQueryString(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    /**
     * set path for api call
     * @param path
     */
    public setPath(path:string) : this {
        this._path = path;
        return this;
    }

    /**
     * set request body for this api call
     * @param body object {key:value}
     */
    public setRequestBody(body:object) : this {
        this._body = body;
        return this;
    }

    /**
     * set method for this api call
     * @param method
     */
    public setMethod(method:METHOD) : this {
        this._method = method;
        return this;
    }

    /**
     * set query parameter (typically in url) for this api call
     * @param query object {key:value}
     */
    public setRequestQuery(query:object) : this {
        this._query = query;
        return this;
    }

    /**
     * set api key for this api call
     * @param api_key
     */
    public setApiKey(api_key:string) : this {
        this._api_key = api_key;
        return this;
    }

    /**
     * Get Config for fetch data
     */
    public getConfig() : ApiConfig {
        let headers = {
            'key' : this._api_key,
            'Accept' : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        };

        let apiConfig = new ApiConfig();
        apiConfig.url = this._path;
        apiConfig.method = this._method;
        apiConfig.headers = headers;
        apiConfig.data = this._toQueryString(this._body);
        apiConfig.params = this._query;

        return apiConfig;
    }
}

export = ApiRequest;


/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

import ApiConfig = require('./apiconfig');

class ApiRequest {
    private _base_url = '';

    private _method : string = "GET";

    private _path : string = "";
    private _api_key : string = "";

    private _body : any = {};
    private _query = {};
    private _headers : object = {};

    private _form_type: string = "application/x-www-form-urlencoded";
    private _on_upload_progress : any = () => {};

    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
     * @param prefix
     * @private
     */
    public _toQueryString(data : any, prefix : any = null) : string {
        // return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
        let str = [], p;
        for (p in data) {
            if (data.hasOwnProperty(p)) {
                let k = prefix ? prefix + "[" + "]" : p,
                    v = data[p];
                str.push((v !== null && typeof v === "object") ?
                    this._toQueryString(v, k) :
                    encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
        }
        return str.join("&");
    }

    /**
     * set request headers
     * @param headers
     */
    public setHeaders(headers : object) : this {
        this._headers = headers;
        return this;
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
     * Set Base URL For this API
     *
     * @param url
     */
    public setBaseURL(url:string) : this {
        this._base_url = url;
        return this;
    }

    /**
     * set request body for this api call
     * @param body object {key:value}
     */
    public setRequestBody(body : any) : this {
        this._body = body;
        return this;
    }

    /**
     * Set form data (for upload purposes)
     * @param data 
     */
    public setFormData(data : FormData) : this {
        this._form_type = 'multipart/form-data';
        this._body = data;
        return this;
    }

    /**
     * set method for this api call
     * @param method
     */
    public setMethod(method:string) : this {
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
     * on upload progress
     */
    public onUploadProgress(cb : any) : this {
        this._on_upload_progress = cb;
        return this;
    } 

    /**
     * Get Config for fetch data
     */
    public getConfig() : ApiConfig {
        let headers = {
            'key' : this._api_key,
            'Accept' : 'application/json',
            'Content-Type' : this._form_type
        };

        Object.keys(this._headers).forEach((key) => {
            // dont know why this getting error ??
            // @ts-ignore
            headers[key] = this._headers[key];
        });

        let apiConfig = new ApiConfig(this._base_url);
        apiConfig.url = this._path;
        apiConfig.method = this._method;
        apiConfig.headers = headers;
        if(this._form_type !== 'multipart/form-data') {
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
}

export = ApiRequest;


/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
import ApiConfig = require('./apiconfig');
import METHOD = require('./method.enum');
declare class ApiRequest {
    private _method;
    private _path;
    private _api_key;
    private _body;
    private _query;
    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
     * @param prefix
     * @private
     */
    private _toQueryString;
    /**
     * set path for api call
     * @param path
     */
    setPath(path: string): this;
    /**
     * set request body for this api call
     * @param body object {key:value}
     */
    setRequestBody(body: object): this;
    /**
     * set method for this api call
     * @param method
     */
    setMethod(method: METHOD): this;
    /**
     * set query parameter (typically in url) for this api call
     * @param query object {key:value}
     */
    setRequestQuery(query: object): this;
    /**
     * set api key for this api call
     * @param api_key
     */
    setApiKey(api_key: string): this;
    /**
     * Get Config for fetch data
     */
    getConfig(): ApiConfig;
}
export = ApiRequest;

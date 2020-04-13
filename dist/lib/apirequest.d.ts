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
    private _form_type;
    private _on_upload_progress;
    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
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
    setRequestBody(body: any): this;
    /**
     * Set form data (for upload purposes)
     * @param data
     */
    setFormData(data: FormData): this;
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
     * on upload progress
     */
    onUploadProgress(cb: any): this;
    /**
     * Get Config for fetch data
     */
    getConfig(): ApiConfig;
}
export = ApiRequest;

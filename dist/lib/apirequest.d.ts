/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
import ApiConfig = require('./apiconfig');
declare class ApiRequest {
    private _base_url;
    private _method;
    private _path;
    private _api_key;
    private _body;
    private _query;
    private _headers;
    private _is_raw_request;
    private _form_type;
    private _on_upload_progress;
    /**
     * format any object into query string eg : {a:"b", c:"d"} will be a=b&c=d
     * @param data
     * @param prefix
     * @private
     */
    _toQueryString(data: any, prefix?: any): string;
    /**
     * set request headers
     * @param headers
     */
    setHeaders(headers: object): this;
    /**
     * set path for api call
     * @param path
     */
    setPath(path: string): this;
    /**
     * Set Base URL For this API
     *
     * @param url
     */
    setBaseURL(url: string): this;
    /**
     * set request body for this api call
     * @param body object {key:value}
     */
    setRequestBody(body: any): this;
    /**
     * Set Raw request, True = for unformatted request in example for sending JSON etc.
     * Default False
     * @param raw
     */
    setRawRequest(raw: boolean): this;
    /**
     * Set Header Form Type ex : multipart/form-data
     * @param form_type
     */
    setFormType(form_type: string): this;
    /**
     * Set form data (for upload purposes)
     * @param data
     */
    setFormData(data: FormData): this;
    /**
     * set method for this api call
     * @param method
     */
    setMethod(method: string): this;
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

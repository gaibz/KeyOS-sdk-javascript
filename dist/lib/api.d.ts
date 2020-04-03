import METHOD = require("./method.enum");
import ApiRequest = require("./apirequest");
declare class Api {
    private api_key;
    /**
     * Process response from http, if success === false then reject promise
     *
     * @param response
     * @param resolve
     * @param reject
     */
    private _processResponse;
    /**
     * Process Error from api call
     *
     * @param error
     * @param reject
     */
    private _processError;
    /**
     * Backward compatibility
     *
     * @param key
     */
    setApiKey(key: string): this;
    /**
     * call api directly (backward compatibility)
     *
     * @param method string GET,POST,PUT,PATCH,DELETE
     * @param path string path
     * @param request_parameter
     * @param request_body
     */
    action(method: METHOD, path?: string, request_parameter?: object, request_body?: object): any;
    /**
     * Call api (new method)
     *
     * @param request
     */
    call(request: ApiRequest): Promise<any>;
}
export = Api;

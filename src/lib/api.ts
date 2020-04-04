/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
import mod = require('./require.node');
import METHOD = require("./method.enum");
import ApiRequest = require("./apirequest");
import global = require("./global");
import {AxiosPromise} from "axios";

const axios = mod.axios;


class Api {

    private api_key : string = "";


    /**
     * Process response from http, if success === false then reject promise
     *
     * @param response
     * @param resolve
     * @param reject
     */
    private _processResponse(response:any, resolve:any, reject:any) : void{
        let resp = {
            status : {
                code : response.status || null,
                text : response.statusText || null
            },
            body: response.data || null,

            _request: response.request || null,
            _headers: response.headers || null,

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
    private _processError(error:any, reject:any) : void {
        error.response = error.response || {};
        
        let err = {
            status : {
                code: error.response.status || null,
                text: error.response.statusText || null,
            },
            body: error.response.data || null,

            _request: error.response.request || null,
            _headers: error.response.headers || null,

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

    /**
     * Backward compatibility
     *
     * @param key
     */
    public setApiKey(key : string) : this {
        this.api_key = key;
        return this;
    }

    /**
     * call api directly (backward compatibility)
     *
     * @param method string GET,POST,PUT,PATCH,DELETE
     * @param path string path
     * @param request_parameter
     * @param request_body
     */
    public action(method : METHOD, path : string ="", request_parameter : object = {}, request_body : object = {}) : any{
        // @ts-ignore
        return new Promise<any>((resolve : any, reject:any) => {
            let headers = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'gzip, deflate, br',
                'key' : this.api_key
            };

            if(this.api_key) {
                headers.key = this.api_key
            }

            let config = {
                baseURL : 'https://api.keyos.id/rest',
                timeout : 10000,
                headers,
                url: path,
                method: method,
                params: request_parameter,
                data: global.toQueryString(request_body),
                responseType: 'json'
            };

            axios(config).then((response:any) => {
                this._processResponse(response, resolve, reject);
            }).catch((error:any) => {
                this._processError(error, reject);
            });
        });
    }

    /**
     * Call api (new method)
     *
     * @param request
     */
    public call(request : ApiRequest) : Promise<any>{
        // @ts-ignore
        return new Promise<any>((resolve:any, reject:any) => {
            axios(request.getConfig()).then((response:any) => {
                this._processResponse(response, resolve, reject);
            }).catch((error:any) => {
                this._processError(error, reject);
            });
        });
    }
}

export = Api;
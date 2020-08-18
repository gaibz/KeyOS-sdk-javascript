/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

class ApiConfig {
    private baseURL : string = "https://api.keyos.id/rest";

    public method : string = "";
    public headers : object = {};
    public data : any = "";
    public params : object = {};
    public url : string = "";
    public responseType : string = "";
    public timeout : number = 10000; // 10 seconds
    public onUploadProgress : any = () => {};

    constructor(baseUrl : string = '') {
        this.baseURL = baseUrl || this.baseURL;
    }
}

export = ApiConfig;
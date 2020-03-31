/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

class ApiConfig {
    private baseURL : string = "https://api.keyos.id/rest";

    public method : string = "";
    public headers : object = {};
    public data : string = "";
    public params : object = {};
    public url : string = "";
    public responseType : string = "";
    public timeout : number = 10000; // 10 seconds

}

export = ApiConfig;
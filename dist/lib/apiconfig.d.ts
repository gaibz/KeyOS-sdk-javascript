/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */
declare class ApiConfig {
    private baseURL;
    method: string;
    headers: object;
    data: any;
    params: object;
    url: string;
    responseType: string;
    timeout: number;
    onUploadProgress: any;
    constructor(baseUrl?: string);
}
export = ApiConfig;

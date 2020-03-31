/**
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

function toQueryString(data : any) : string {
    return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
}

export = {toQueryString};
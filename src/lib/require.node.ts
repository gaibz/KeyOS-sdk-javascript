/**
 * This will handle all node module require
 * because typescript will error at require
 *
 * @author : Herlangga Sefani <https://github.com/gaibz>
 */

declare function require(name:string) : any;
const axios = require('axios').default;
export = {axios};

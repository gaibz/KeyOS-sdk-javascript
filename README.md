#     بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
Thanks to Allah for supporting this Project. 

# KeyOS API SDK For Javascript 


## Installation 

    npm install @keyos/api-sdk  

## Usage & Example REST

### Initialization

    const { Rest } = require("@keyos/api-sdk");
    let apiPath = Rest.apiPath;
    let RestApi = new Rest.Api();
 
### Example : Search City or Subdistrict
documentation can be found in : [KeyOS Documentation](https://doc.keyos.id/books/rest-api/page/search-city-subdistrict)

    RestApi.action('GET', apiPath.location_city_or_subdistrict, {
        q : "tasikmalaya" // q is the request parameter, see doc
    }).then((response) => {
        // if request success this code will firing
        // response.getStatusCode() for get status code
        // response.getStatusText() for get status text
        // response.getBody() for get response body
        console.log({response});
    }).catch((error) => {
        // in case we have some error
        // error.getStatusCode() for get status code
        // error.getStatusText() for get status text
        // error.getBody() for get response body
        console.log({error});
    }).finally(() => {
        // this block is optional, and will fired after then and catch finished
    });
     
     

Crafted with 💙 by [Herlangga Sefani](https://www.facebook.com/herlangga.sefani)

Github repository : https://github.com/gaibz/KeyOS-sdk-javascript 
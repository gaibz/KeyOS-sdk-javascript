<h1 align="right">     بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم </h1>

Thanks to Allah for supporting this Project. 

Crafted with 💙 by [Herlangga Sefani](https://www.facebook.com/herlangga.sefani)

Github repository : https://github.com/gaibz/KeyOS-sdk-javascript 

# KeyOS API SDK For Javascript 


## Installation 

    npm install @keyos/api-sdk  

## API Documentation
Complete api documentation can be found on [KeyoS Documentation API](https://doc.keyos.id/shelves/api-documentation) 


## Usage & Example REST

### Initialization

```javascript
const { Rest } = require("@keyos/api-sdk");
let RestApi = new Rest.Api();
```
 
### Example : Search City or Subdistrict
documentation can be found in : [KeyOS Documentation City or Subdistrict](https://doc.keyos.id/books/rest-api/page/search-city-subdistrict)

```javascript
RestApi.action('GET', 'location/city_or_subdistrict', {
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
```
# KeyOS API SDK For Javascript 

<h1 align="right">     بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم </h1>

Thanks to Allah for supporting this Project. 

Crafted with 💙 by [Herlangga Sefani](https://www.facebook.com/herlangga.sefani)

Github repository : https://github.com/gaibz/KeyOS-sdk-javascript 

Project started at end of March 2020


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
 
### Example GET Request : Search City or Subdistrict
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

If you want some more Object Oriented way (This will also trigger autocompletion if your text editor support it) : 

```javascript
let request = new Rest.ApiRequest();
request.setPath('location/city_or_subdistrict')
    .setMethod(Rest.METHOD.GET)
    .setRequestQuery({q : 'tasikmalaya'});

RestApi.call(request).then((response) => {
    console.log({response});
}).catch((error) => {
    console.log("error");
    console.log(error);
});
``` 


### Example POST Request : Login / Auth

documentation can be found in : [KeyOS Documentation Admin Login](https://doc.keyos.id/books/rest-api/page/admin-authentication)

```javascript
// we will pass the third parameter since we dont have to specify query parameter
// the fourth parameter is the request body
RestApi.action('POST', 'auth', {}, {
    username : '<some_admin_username>',
    password : '<some_admin_password>',
    roles : 'ADMIN'
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

Object Oriented Style : 
```javascript
let request = new Rest.ApiRequest();
// method chaining style
request.setPath('location/city_or_subdistrict')
.setMethod(Rest.METHOD.GET)
.setRequestBody({
    username : '<some_admin_username>',
    password : '<some_admin_password>',
    roles : 'ADMIN'
});

RestApi.call(request).then((response) => {
    console.log({response});
}).catch((error) => {
    console.log("error");
    console.log(error);
}).finally(() => {
    // This block is optional and will firing after then and catch executed
    // normally this is promise based
});
```
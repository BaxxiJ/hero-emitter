const https = require('https');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var prod_url = "https://hero-superheroes-apicast-production.apps.coffee.demolab.local:443";
var endpoint = "/v1/api/heroes/random";
var user_key = "?user_key=d5e22b69792d9c4fe35744df5a7d793c";
//var test_api = "https://api.kanye.rest/?format=text"

var test_api = {
    hostname: "https://api.kanye.rest",
    path: "/?format=text",
}

var api = {
    hostname: prod_url,
    path: endpoint + user_key,
}

const myURL = new URL(endpoint, prod_url);

https.get(test_api.hostname + test_api.path, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log(JSON.parse(data).quote);
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
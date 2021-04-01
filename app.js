const https = require('https');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

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

// Setting Timers for the function call

// 

setInterval(timerFunc, 600000);

apiRequest(api.hostname, api.path);

function timerFunc() { 
    var limit = (Math.random() * 10) * (Math.random() * 10);
    //var output = "#";
    for (let i = 0; i < limit; i++) {
        //console.log(output += "#");
        apiRequest(api.hostname, api.path);
    }
}

apiRequest(test_api.hostname, test_api.path);

// Sending the API

// apiRequest(api.hostname, api.path);
// apiRequest(test_api.hostname, test_api.path); 

function apiRequest(hostname, path) {
    // console.log(hostname + path);
    https.get(hostname + path, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (d) => {
        process.stdout.write(d);
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        //console.log(JSON.parse(data).quote) (.quote removed by path parameter);
        console.log(data); // this basically works as a newline, doesn't output the data object but makes logs nicer
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}
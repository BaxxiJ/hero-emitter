const https = require('https');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; 

var prod_url = "https://hero-superheroes-apicast-production.apps.coffee.demolab.local:443";
let endpoints = ["/v1/api/heroes/random", "/v1/api/heroes/1", "/v1/api/heroes"];
let user_keys = ["?user_key=d5e22b69792d9c4fe35744df5a7d793c", "?user_key=2fe5533c885a9a28fd6da5914d47601c"];
//var test_api = "https://api.kanye.rest/?format=text"

var test_api = {
    hostname: "https://api.kanye.rest",
    path: "/?format=text",
}

var api = {
    hostname: prod_url,
    path: endpoints[1] + user_keys[1],
}

// Setting Timers for the function call

// 
function getRandom(){
    return (Math.random() * 10) * (Math.random() * 10);
}

setInterval(timerFunc, 600000);

function timerFunc() {
    user_keys.forEach(apiPathAssembler);
}

function apiPathAssembler(value) {
    console.log(value);
    let loops = Math.random() * 3
    for (let i = 0; i < loops; i++) {
        let callAmount = getRandom();
        if (i == 2) {
            callAmount = callAmount / 4;
        }
        for (let j = 0; j < callAmount; j++) {
            apiRequest(prod_url, endpoints[i] + value);
            console.log(prod_url, endpoints[i] + value)
        }
    }
}

// Sending the API


function apiRequest(hostname, path) {
    https.get(hostname + path, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (d) => {
        process.stdout.write(d);
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(data); // this basically works as a newline, doesn't output the data object but makes logs nicer
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}
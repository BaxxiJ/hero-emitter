const https = require('https');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; 

var prod_url = "http://energydemo-prod.apps.coffee.demolab.local:80";
let endpoints = ["/domain1", "/domain1/test1", "domain1/tst1/test2"];
let user_keys = ["user_key=a9ceb65e371bf1c54038efb99f728d39"];

var api = {
    hostname: prod_url,
    path: endpoints[1] + user_keys[1],
}

// Setting Timers for the function call

// 
function getRandom(){
    return (Math.random() * 3) * (Math.random() * 3);
}

setInterval(timerFunc, 2000);

function timerFunc() {
    user_keys.forEach(apiPathAssembler);
}

function apiPathAssembler(user_key) {
    console.log(user_key);
    let loops = Math.random() * 3
    for (let i = 0; i < loops; i++) {
        let callAmount = getRandom();
        // if (i == 2) {
        //     callAmount = callAmount / 4;
        // }
        for (let j = 0; j < callAmount; j++) {
            apiRequest(prod_url, endpoints[i] + user_key);
            console.log(prod_url, endpoints[i] + user_key);
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

const http = require('http');


//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; 

var prod_url = "http://energydemo-prod.apps.coffee.demolab.local:80";
let endpoints = ["/domain1", "/domain1/test1", "/domain1/test1/test2", "/topic"];
let user_keys = ["?user_key=a9ceb65e371bf1c54038efb99f728d39"];
const body = {"key1":"value1","key2":"value2"};

var api = {
    hostname: prod_url,
    path: endpoints[1] + user_keys[1],
}

// Setting Timers for the function call

// 
function getRandom(){
    return (Math.random() * 2) * (Math.random() * 3);
}

setInterval(timerFunc, 1200);

// function timerFunc() {
//     user_keys.forEach(apiPathAssembler);
// }

// function apiPathAssembler(user_key) {
//     console.log(user_key);
//     let loops = Math.random() * 3
//     for (let i = 0; i < loops; i++) {
//         let callAmount = getRandom();
//         // if (i == 2) {
//         //     callAmount = callAmount / 4;
//         // }
//         for (let j = 0; j < callAmount; j++) {
//             apiRequest(prod_url, endpoints[i] + user_key);
//             console.log(prod_url + endpoints[i] + user_key);
//         }
//     }
// }

apiRequest(api.hostname, api.path);
// Sending the API
function apiRequest(hostname, path) {
    console.log(hostname + path);
    let req = http.request(hostname + path, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        })
        resp.on('end', () => {
            console.log("No more data in response");
        });
    });

    req.on('error', (e) => {
        console.error("ERR: " + e.message);
    })
    console.log("req created?");

    req.write(JSON.stringify(body));
    console.log("req written?");
    req.end();
};

    

// function apiRequest(hostname, path) {
//     console.log(hostname + "___" + path);
//     https.get(hostname + path, (resp) => {
//     let data = '';

//     // A chunk of data has been received.
//     resp.on('data', (d) => {
//         process.stdout.write(d);
//     });

//     // The whole response has been received. Print out the result.
//     resp.on('end', () => {
//         console.log(data); // this basically works as a newline, doesn't output the data object but makes logs nicer
//     });

//     }).on("error", (err) => {
//     console.log("Error: " + err.message);
//     });
// }

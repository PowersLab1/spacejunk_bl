var https = require('follow-redirects').https;
const config = require("../config");
var qs = require('querystring');


// Originally had thought to move these requests to more modern frameworks
// Instead of using this promise structure, but due to the older node version (16)
// Some of the newer frameworks (such as fetch) were throwing all kinds of fun errors

export async function awsSaveData (gameState) {
    try {
        // // Remove the link ref from the game state
        // // const {link, returning, ...rest} = gameState;
        gameState.data = await JSON.stringify({
            encrypted_metadata: gameState.encryptedMetadata,
            taskName: config.taskName,
            taskVersion: config.taskVersion,
            data: await processLabData(gameState.data),
        });

        var options = {
            'method': 'POST',
            'hostname': 'de8cnjde61.execute-api.us-east-2.amazonaws.com',
            'path': '/default/saveTaskData',
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            'maxRedirects': 20
          };

          var postData = qs.stringify({
            'encrypted_metadata': gameState.encryptedMetadata,
            'data': gameState.data,
            'surveyUrl': gameState.surveyUrl
          });

        return new Promise(function (resolve, reject) {
            var req = https.request(options, function (res) {
                var chunks = [];
              
                res.on("data", function (chunk) {
                  chunks.push(chunk);
                });
              
                res.on("end", function (chunk) {
                  console.log(res.statusCode);
                  if (res.statusCode === 200) {
                    return resolve(true);
                  }
                  return resolve(false);
                });
              
                res.on("error", function (error) {
                    console.error(error);
                    resolve(false);
                });
              });
             
              req.write(postData);
              
              req.end();
        });
    }
    catch (e) {
        console.log(`Error sending data: ${e}`);
        console.log(e.message);
        return false;
    }
}

export async function awsFetchLink(encryptedMetadata) {
    try {

        const postData = qs.stringify({
            encrypted_metadata: encryptedMetadata,
        });

        const postOptions = {
            hostname: config.awsLambda.fetchLink.host,
            port: 443,
            path: config.awsLambda.fetchLink.path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData),
            },
          };
      

        return new Promise(function (resolve, reject) {
            
            const req = https.request(postOptions, (res) => {
                res.setEncoding('utf8');
                var body = '';
                res.on('data', function(d) {
                    body += d;
                 });
                res.on('end', () => resolve({link: body}));
              })

              req.on('error', (e) => {
                if (config.debug) {
                  console.log("ERROR:");
                  console.log(e);
                }
                resolve(null);
              });
          
              req.write(postData);
              req.end();
        });

    }
    catch (e) {
        console.log(`Error fetching link: ${e}`);
        
        return null;
    }
}

/**
 * This is currently empty as no data manipulation is needed, 
 * but this would be a good spot to handle data changes before 
 * being sent to the lambda function / storage
 * @param {*} data 
 * @returns 
 */
async function processLabData(data) {
    // exportData.encrypted_metadata = encryptedMetadata;
    // exportData.taskName = config.taskName;
    // exportData.taskVersion = config.taskVersion;
    // exportData.data = this.processLabJsData(labJsData);

    return data;
}

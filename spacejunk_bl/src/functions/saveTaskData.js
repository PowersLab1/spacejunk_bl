import { stringify } from "querystring";
const config = require("../config");
// var https = require('follow-redirects').https;
// var fs = require('fs');

// var qs = require('querystring');


export async function awsSaveData (gameState) {
    try {
        // Remove the link ref from the game state
        // const {link, returning, ...rest} = gameState;
        gameState.data = await JSON.stringify({
            encrypted_metadata: gameState.encryptedMetadata,
            taskName: config.taskName,
            taskVersion: config.taskVersion,
            data: await processLabData(gameState.data),
        });
        console.log(gameState.data)
        const postData = stringify({
            'encrypted_metadata': gameState.encryptedMetadata,
            'survey_url': gameState.surveyUrl,
            "link": gameState.link,
            'data': gameState.data,
          });
        console.log(postData);
        const response =
            await fetch(`https://${config.awsLambda.saveTaskData.host}${config.awsLambda.saveTaskData.path}`, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: postData
            });
        console.log("Done");
        console.log(response);
        console.log(response.status);
        if (response.status === 200)
        {
            return true
        }

        // var options = {
        //   'method': 'POST',
        //   'hostname': 'de8cnjde61.execute-api.us-east-2.amazonaws.com',
        //   'path': '/default/saveTaskData',
        //   'headers': {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   },
        //   'maxRedirects': 20
        // };
        
        // var req = https.request(options, function (res) {
        //   var chunks = [];
        
        //   res.on("data", function (chunk) {
        //     chunks.push(chunk);
        //   });
        
        //   res.on("end", function (chunk) {
        //     console.log("END");
        //     console.log(res.statusCode);
        //     console.log(res.body);
        //     var body = Buffer.concat(chunks);
        //     console.log(body.toString());
        //   });
        
        //   res.on("error", function (error) {
        //     console.error(error);
        //   });
        // });
        
        // var postData = qs.stringify({
        //   'encrypted_metadata': gameState.encryptedMetadata,
        //   'survey_url': gameState.surveyUrl,
        //   "link": gameState.link,
        //   'data': gameState.data,
        // });
        
        // req.write(postData);
        
        // req.end();

        // return false;
    }
    catch (e) {
        console.log(`Error sending data: ${e}`);
        console.log(e.message);
        return false;
    }
}

export async function awsFetchLink(encryptedMetadata) {
    try {
        const response = await (
            await fetch(`https:///${config.awsLambda.fetchLink.host}${config.awsLambda.fetchLink.path}`,
                {
                    method: "POST",
                    // headers: {
                    //     "Content-Type": "application/x-www-form-urlencoded",
                    //     "Content-Length": Buffer.byteLength(postData)
                    // },
                    body: { encrypted_metadata: encryptedMetadata }
                    // body: postData
                }
            )
        ).json();
        console.log("Done");
        return response;
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

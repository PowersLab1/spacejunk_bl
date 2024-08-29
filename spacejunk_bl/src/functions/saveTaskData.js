import { stringify } from "querystring";
// import {stringify} from "qs";
const config = require("../config");
// const qs = require('qs');
var https = require('follow-redirects').https;
var fs = require('fs');

var qs = require('querystring');


export async function awsSaveData (gameState) {
    try {
        // Remove the link ref from the game state
        // const {link, returning, ...rest} = gameState;

        // const stringifiedData = await JSON.stringify({
        //     encrypted_metadata: gameState.encryptedMetadata,
        //     taskName: gameState.taskName,
        //     taskVersion: gameState.taskVersion,
        //     data: await processLabData(gameState.data)
        // });
        // console.log(stringifiedData);
        // const body = new URLSearchParams()
        //     body.append("encrypted_metadata", "U2FsdGVkX1+H0Yb9Y1VrqhnHPXkv2xHkCwc29hSAyVr0DMaKQNjBWnbje4JMrWAJl4+mI836qL95znea8Z2YLg==");
        //     // data: stringifiedData
        //     body.append("data", '{"encrypted_metadata":"U2FsdGVkX1+H0Yb9Y1VrqhnHPXkv2xHkCwc29hSAyVr0DMaKQNjBWnbje4JMrWAJl4+mI836qL95znea8Z2YLg==","taskName":"spacejunk_bl","taskVersion":"1.0.0","data":[{"tutorialRepeated":false,"originalHint":0,"originalResult":0,"participantPosition":48.382742172553904,"participantConfidence":90.3,"success":true,"level":2,"distanceMovedX":40.259740259740276,"distanceMovedY":9.7,"trialScore":9,"actualTrialScore":90,"timeToComplete":3504,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":9,"originalStartPos":59.151972941784635},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":100,"participantConfidence":100,"success":true,"level":2,"distanceMovedX":84.4155844155843,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":5142,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":19,"originalStartPos":-7.165612265223914},{"tutorialRepeated":false,"originalHint":0.5,"originalResult":-0.5,"participantPosition":0,"participantConfidence":100,"success":true,"level":3,"distanceMovedX":83.1168831168831,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":3414,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":29,"originalStartPos":99.75594741253467},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":100,"participantConfidence":100,"success":true,"level":4,"distanceMovedX":64.93506493506487,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":3113,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":39,"originalStartPos":22.81307238707119},{"tutorialRepeated":false,"originalHint":0.5,"originalResult":-0.5,"participantPosition":0,"participantConfidence":100,"success":true,"level":5,"distanceMovedX":75.32467532467527,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":2678,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":49,"originalStartPos":89.56565831340775},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":100,"participantConfidence":100,"success":true,"level":6,"distanceMovedX":83.1168831168831,"distanceMovedY":0,"trialScore":20,"actualTrialScore":200,"timeToComplete":3543,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":69,"originalStartPos":-6.727002377060573},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":0,"participantConfidence":100,"success":false,"level":6,"distanceMovedX":98.70129870129875,"distanceMovedY":0,"trialScore":-1,"actualTrialScore":0,"timeToComplete":5137,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":68,"originalStartPos":77.74798786666433}]}');
        // console.log(body);
        // // console.log();
        // const response = await (
        //     await fetch(`https://${config.awsLambda.saveTaskData.host}${config.awsLambda.saveTaskData.path}`, {
        //         method: "POST",
        //         mode: "no-cors",
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //             // "Content-Length": Buffer.byteLength(body),
        //         },
        //         body: body
        //     })).json();
        // console.log("Done");


        var options = {
          'method': 'POST',
          'hostname': 'de8cnjde61.execute-api.us-east-2.amazonaws.com',
          'path': '/default/saveTaskData',
          'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          'maxRedirects': 20
        };
        
        var req = https.request(options, function (res) {
          var chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function (chunk) {
            console.log("END");
            console.log(res.statusCode);
            console.log(res.body);
            var body = Buffer.concat(chunks);
            console.log(body.toString());
          });
        
          res.on("error", function (error) {
            console.error(error);
          });
        });
        
        var postData = qs.stringify({
          'encrypted_metadata': 'U2FsdGVkX1+H0Yb9Y1VrqhnHPXkv2xHkCwc29hSAyVr0DMaKQNjBWnbje4JMrWAJl4+mI836qL95znea8Z2YLg==',
          'survey_url': gameState.surveyUrl,
          "link": gameState.link,
          'data': '{"encrypted_metadata":"U2FsdGVkX1+H0Yb9Y1VrqhnHPXkv2xHkCwc29hSAyVr0DMaKQNjBWnbje4JMrWAJl4+mI836qL95znea8Z2YLg==","taskName":"spacejunk_bl","taskVersion":"1.0.0","data":[{"tutorialRepeated":false,"originalHint":0,"originalResult":0,"participantPosition":48.382742172553904,"participantConfidence":90.3,"success":true,"level":2,"distanceMovedX":40.259740259740276,"distanceMovedY":9.7,"trialScore":9,"actualTrialScore":90,"timeToComplete":3504,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":9,"originalStartPos":59.151972941784635},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":100,"participantConfidence":100,"success":true,"level":2,"distanceMovedX":84.4155844155843,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":5142,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":19,"originalStartPos":-7.165612265223914},{"tutorialRepeated":false,"originalHint":0.5,"originalResult":-0.5,"participantPosition":0,"participantConfidence":100,"success":true,"level":3,"distanceMovedX":83.1168831168831,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":3414,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":29,"originalStartPos":99.75594741253467},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":100,"participantConfidence":100,"success":true,"level":4,"distanceMovedX":64.93506493506487,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":3113,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":39,"originalStartPos":22.81307238707119},{"tutorialRepeated":false,"originalHint":0.5,"originalResult":-0.5,"participantPosition":0,"participantConfidence":100,"success":true,"level":5,"distanceMovedX":75.32467532467527,"distanceMovedY":0,"trialScore":10,"actualTrialScore":100,"timeToComplete":2678,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":49,"originalStartPos":89.56565831340775},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":100,"participantConfidence":100,"success":true,"level":6,"distanceMovedX":83.1168831168831,"distanceMovedY":0,"trialScore":20,"actualTrialScore":200,"timeToComplete":3543,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":69,"originalStartPos":-6.727002377060573},{"tutorialRepeated":false,"originalHint":-0.5,"originalResult":0.5,"participantPosition":0,"participantConfidence":100,"success":false,"level":6,"distanceMovedX":98.70129870129875,"distanceMovedY":0,"trialScore":-1,"actualTrialScore":0,"timeToComplete":5137,"timedOut":false,"timedOutCount":0,"reward":0,"totalScore":68,"originalStartPos":77.74798786666433}]}'
        });
        
        req.write(postData);
        
        req.end();

        // return response;
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

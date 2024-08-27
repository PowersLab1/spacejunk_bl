// import { stringify } from "querystring";
const config = require("../config");

export async function awsSaveData (gameState) {
    try {
        // Remove the link ref from the game state
        const {link, ...rest} = gameState;
        const body = {...rest,
            data: await processLabData(rest.data)}
        console.log(body);
        const response = await (
            await fetch(`https://${config.awsLambda.saveTaskData.host}${config.awsLambda.saveTaskData.path}`, {
                method: "POST",
                mode: "no-cors",
                // headers: {
                //     "Content-Type": "application/x-www-form-urlencoded",
                //     "Content-Length": Buffer.byteLength(postData),
                // },
                body: {
                    ...rest,
                    data: await processLabData(rest.data)
                }
            })).json();
        console.log("Done");
        return response;
    }
    catch (e) {
        console.log(`Error sending data: ${e}`);
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

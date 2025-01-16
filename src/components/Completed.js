import React, { useEffect, useState } from 'react'
import { awsSaveData } from '../functions/saveTaskData';
import backgroundImage from "../resources/background_level6.jpg"
import "./Font.css"
import { Redirect } from './Redirect';
import { aws_saveTaskData } from '../lib/aws_lambda';
import * as config from "../config.json";

const style = {
    fontFamily: "VT323",
    textAlign: "center",
    color: "white",
    backgroundPosition: "center",
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    height: "100vh",
    backgroundSize: "cover"
}


export const Completed = ({ gameState }) => {

    /**
     * Function to handle the "download data" button
     * Being here isn't the best, but it was throwing issues when outside the component function
     */
    const handleDownload = () => {
        const data = JSON.stringify(gameState); // Your data
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.json'; // Set the desired filename
        a.click();

        // Clean up
        URL.revokeObjectURL(url);
        // Reset the data in the game
        localStorage.removeItem("TestResults");
        localStorage.removeItem("completed");
    };

    const [redirect, setRedirect] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [success, setSuccess] = useState(false);


    useEffect(() => {

        const taskData = JSON.parse(localStorage.getItem("TestResults"));
        gameState.data = taskData;
        console.log(gameState.surveyUrl);
        // While we have less tried less than 10 times
        if (attempts < 10) {
            async function save(gameState) {

                const response = await awsSaveData(gameState);
                console.log(response);
                if (response !== true) {
                    await setTimeout(() => {
                            setAttempts(attempts + 1);
                        }, 2000);
                    }
                    else {
                        localStorage.removeItem("TestResults");
                        localStorage.removeItem("completed");
                        // We have managed to send the data!
                        setSuccess(true);

                }
            }
            save(gameState);
        }
    }, [attempts])


    const delayAndRedir = () => {setTimeout(() => {setRedirect(true)}, 10000)};
    if (redirect) {
        console.log(gameState.surveyUrl);
        return (
            <Redirect link={gameState.surveyUrl} encryptedMetadata={gameState.encryptedMetadata} />
        )
    }
    if (success) {
        delayAndRedir();
            return (
                <div style={style}>
                    <div>The game is complete and the data has been sent, thank you for your participation.  Redirecting in 10 seconds</div>
                </div>
            )
    }
    if (attempts > 9) {
        return (
            <div style={style}>
                <div>Unable to send the data to the server.  Either, refresh the system to try again, or download your data here</div>
                <button onClick={handleDownload}>Download File</button>
            </div>
        )
    }
    return (
        <div style={style}> {gameState.returning && <h3 style={{ margin: "0" }}>Welcome back champion!</h3>}
            <div>Completed, attempting to send data to save manager, times attempted: {attempts}</div>
        </div>
    )
}

// AAA
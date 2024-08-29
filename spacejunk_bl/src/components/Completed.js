import React, { useEffect, useState } from 'react'
import { awsSaveData } from '../functions/saveTaskData';
import backgroundImage from "../resources/background_level6.jpg"
import "./Font.css"
import { Redirect } from './Redirect';
import { aws_saveTaskData } from '../lib/aws_lambda';

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
    const [time, setTime] = useState(0);


    useEffect(() => {

        const taskData = JSON.parse(localStorage.getItem("TestResults"));
        gameState.data = taskData;
        // While we have less tried less than 10 times
        if (attempts < 10) {
            async function save(gameState) {
                // const response = await aws_saveTaskData(gameState.encryptedMetadata, await JSON.stringify({
                //     encrypted_metadata: gameState.encryptedMetadata,
                //     taskName: gameState.taskName,
                //     taskVersion: gameState.taskVersion,
                //     data: gameState.data
                // }));
                const response = await awsSaveData(gameState);
                aws_saveTaskData(gameState.encryptedMetadata, {
                    encrypted_metadata: gameState.encryptedMetadata,
                    survey_url: gameState.surveyUrl,
                    data: JSON.stringify(gameState.data)
                })
                console.log(response);
                if (response !== true) {
                    // await setTimeout(() => {
                    // }, 2000);
                    setAttempts(attempts + 1);
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
        return (
            <Redirect link={gameState.link} encryptedMetadata={gameState.encryptedMetadata} />
        )
    }
    if (success) {
        delayAndRedir();
            return (
                <div style={style}>
                    <div>The game is complete and the data has been sent, thank you for your participation.  Riderecting in 10 seconds</div>)
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
import React, { useEffect, useState } from 'react'
import { parse } from "query-string";
import "questlib";
import addScript from '../functions/addScript';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Completed } from '../components/Completed';
import { LoadingScript } from '../components/LoadingScript';
import { awsFetchLink } from '../functions/saveTaskData';
import config from "../config";
import { isLocalhost } from '../lib/utils';

export const LabJSWrapperModern = () => {
    // ADDSCRIPT, COMPLETED, PLAYING
    // State that handles the Output to Render / If data needs changing
    const [state, setState] = useState("ADDSCRIPT");
    // State that stores MetaData output for Sending to Backend
    const [gameState, setGameState] = useState({
        encrypted_metadata: undefined,
        taskName: undefined,
        taskVersion: undefined,
        surveyUrl: undefined,
        link: undefined,
        returning: false,
        data: []
    });
    // State that stores if the Game Script has successfully loaded
    const [scriptLoaded, setScriptLoaded] = useState(false);
    // UseLocation Hook to get URL Query String
    const { search } = useLocation();

    // Runs once on load
    useEffect(() => {

        // Parse get params for encrypted metadata
        const params = parse(
            search,
            { ignoreQueryPrefix: true }
        );
        // console.log(params)

        console.log(`Params Id ${params.id}`);
        // !!! REMOVE THIS LINE, ONLY FOR DEV
        if (isLocalhost) {
            console.log("Adding Params ID as in dev");
            params.id = "U2FsdGVkX1+H0Yb9Y1VrqhnHPXkv2xHkCwc29hSAyVr0DMaKQNjBWnbje4JMrWAJl4+mI836qL95znea8Z2YLg==";
        }

        const newState = {
            encryptedMetadata: params.id,
            taskName: config.taskName,
            taskVersion: config.taskVersion,
            link: params.survey_url,
            surveyUrl: params.survey_url
        };

        console.log(`NEW STATE: ${JSON.stringify(newState)}`);

        if (newState.encryptedMetadata != undefined) {
            addScript(process.env.PUBLIC_URL + '/external/lab.js', "LabJs");
        }

        setGameState(newState);

        // Add the Game Script
        if (
            document.getElementById("canvasScript") === undefined ||
            document.getElementById("canvasScript") === null
        ) {
            addScript(`${process.env.PUBLIC_URL}/script.js`, "canvasScript");
        }
        
        // ------------------
        // Event Listeners
        // ------------------
        const scriptLoaded = (event) => {
            console.log("script loaded");
            setScriptLoaded(true);
        }
        // Runs when the game has completed
        const onComplete = async (event) => {
            // Your logic here
            console.log("Game Complete");
            const previousTrialStateString = await JSON.stringify({
                encryptedMetadata: gameState.encryptedMetadata, 
                surveyUrl: gameState.surveyUrl
            });
            localStorage.setItem("previousTrialState", previousTrialStateString)
            setState("COMPLETED")
        };
    
        // Add event listener for when the game is complete
        window.addEventListener('completed', onComplete);
        window.addEventListener("scriptLoaded", scriptLoaded);

        return () => {
            // Remove the listeners when the page unloads
            window.removeEventListener('completed', onComplete);
            window.removeEventListener("scriptLoaded", scriptLoaded);
        };

    }, []);

    // This runs when the "Script Loaded" state is changed
    useEffect(() => {
        console.log("SCRIPT LOADED UEF", scriptLoaded);
        console.log(gameState);
        // If the Script Loaded state has been set to true
        if (scriptLoaded) {
            // Check for the previous result data in localStorage
            if (
                // TODO: GIVE THIS A BETTER NAME / MAKE IT DYNAMIC
                localStorage.getItem("TestResults") != undefined &&
                localStorage.getItem("TestResults") != "undefined" &&
                JSON.parse(localStorage.getItem("TestResults")).length > 0
            ) {
                // If we have completed the game, we know the results are complete and can be sent
                if ((localStorage.getItem("completed") === true || localStorage.getItem("completed") === "true")){  //&& localStorage.getItem("previousTrialState") != undefined) {
                    
                    console.warn("COMPLETE IS TRUE");
                    // const previousTrialState = JSON.parse(localStorage.getItem("previousTrialState"));
                    // console.log(previousTrialState);
                    // gameState.encryptedMetadata = previousTrialState.encryptedMetadata;
                    // gameState.surveyUrl = previousTrialState.surveyUrl;
                    // We have previously completed but sending didn't work
                    // Should redirect back to completed page
                    // But should make a note that they are returning so that can abandon
                    console.log(gameState);
                    setGameState({ ...gameState, returning: true });
                    setState("COMPLETED");
                    return
                }
                // Otherwise, we want to remove partial results and restart
                console.log("Previous Data found, removing");
                setGameState(localStorage.removeItem("TestResults"));
            }
            setState("PLAYING");
        }
    }, [scriptLoaded]);


    console.log(state);


    const root = document.getElementById("root");
    const canvas = document.getElementById("canvas");
    // Now that we have set if we are using root or canvas
    // Handle the state to return the right view and data
    switch (state) {
        case "COMPLETED":
            root.hidden = false;
            canvas.hidden = true;
            return <Completed gameState={gameState} />;
            break;
        case "PLAYING":
            // root.hidden = false;
            // canvas.hidden = true;
            // return <Completed gameState={gameState} />;
            root.hidden = true;
            canvas.hidden = false;
            return null;
            break;
        case "ADDSCRIPT":
            // return <Completed gameState={gameState} />;
            return <LoadingScript />
        default:
            return null;
    }



}

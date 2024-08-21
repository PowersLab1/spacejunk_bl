/**
 * Resets the Player back to starting position and settings
 * @param {*} globalState The Global State Object
 */
export function resetPlayer(globalState, timedOut = false) {
    // Find the padding between the Rock and the Left edge
    const paddingL = (globalState.rockArea && globalState.rockArea.leftX) ?
        globalState.rockArea.leftX : 0 + (globalState.rockArea && globalState.rockArea.w) ?
            globalState.rockArea.w : 0
    // Find the padding between rock right and far edge
    const paddingR = globalState.canvasWidth - ((globalState.rockArea && globalState.rockArea.rightX) ?
        globalState.rockArea.rightX : globalState.canvasWidth)
    // Calculate the hint pos by
    // Finding active area (canvas width - l and r paddings)
    const activeArea = globalState.canvasWidth - (paddingL + paddingR);
    globalState.maxWidth = (globalState.canvasWidth / 20) * 19
    globalState.minWidth = globalState.canvasWidth / 20
    globalState.currentPower = 50;
    globalState.playerSettings.w = (globalState.canvasWidth) / 10;
    globalState.playerSettings.h = (globalState.canvasHeight) / 10;
    // ?? For Original Position Recording ??
    globalState.playerSettings.originalStartPos = 0;
    if (globalState.gameState === "INTRO") {
        // Set lander to middle
        globalState.playerSettings.x = globalState.canvasWidth / 2
    }
    else {
        // Set the Rover position to a random spot within the active area
        globalState.playerSettings.x = ((((activeArea / 100) * 95) * Math.random()) + paddingL) +
            (((globalState.rockArea && globalState.rockArea.w) ? globalState.rockArea.w : 0) / 2);
        // ?? For Original Position Recording ??
        globalState.playerSettings.originalStartPos = globalState.playerSettings.x;
    }
    globalState.playerSettings.y = (globalState.canvasHeight / 5) * 3.1;
    globalState.playerSettings.speed = globalState.canvasWidth / 120;
    globalState.playerSettings.dx = 0;
    globalState.playerSettings.dy = 0;
    globalState.playerSettings.powerSpeed = globalState.canvasWidth / 360;
    globalState.playerSettings.power = 10;
    globalState.playerSettings.beamColor = "green";
    globalState.playerSettings.beamActive = false;
    globalState.playerSettings.inactivePress = false;
    globalState.hintAnimation.y = (globalState.canvasHeight / 10) * 1
    //   const canvas = $("#canvas")[0];
    globalState.rect = document.getElementById("canvas").getBoundingClientRect();
    // Reset the "time left" timer
    globalState.trialTimeLeft = globalState.trialTime / 1000;
    // Reset the trialScore and Success
    globalState.trialResults.score = 0;
    globalState.trialResults.actualScore = 0;
    globalState.trialResults.success = false;
    if (timedOut) {
        globalState.trialResults.timedOutCount += 1;
    }
    else {
        globalState.trialResults.timedOutCount = 0;
    }
    globalState.trialResults.timedOut = timedOut;
    // Reset the Distance Moved
    globalState.trialResults.movementX = 0;
    globalState.trialResults.movementY = 0;
    // Reset the Trial Timings	
    globalState.trialResults.trialTime = 0;
    globalState.trialResults.trialStartTime = 0;
    globalState.trialResults.trialEndTime = 0;
    globalState.trialResults.trialTime = 0;
    globalState.activeArea = activeArea;
    // Saves a boolean of whether each trial of the tutorial was passed or not
    globalState.tutorialResults = {
        "1": globalState.tutorialResults["1"] || false,
        "2": globalState.tutorialResults["2"] || false,
        "3": globalState.tutorialResults["3"] || false,
    }
}

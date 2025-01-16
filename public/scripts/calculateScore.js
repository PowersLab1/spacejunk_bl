import { reverseNumber } from "./utilities.js";

export function calculateScore(globalState) {
    // Calculate the Time the trial took to complete
    globalState.trialResults.trialTime = globalState.trialResults.trialEndTime - globalState.trialResults.trialStartTime
    // Find the padding between the Rock and the Left edge
    const paddingL = globalState.rockArea.leftX + globalState.rockArea.w
	// Find the padding between rock right and far edge
    const paddingR = globalState.canvasWidth - globalState.rockArea.rightX
	// Calculate the hint pos by
	// Finding active area (canvas width - l and r paddings)
    const activeArea = globalState.canvasWidth - (paddingL + paddingR);
	// Dividing active area by 100 and multiplying by junk location (then adding left padding on)
    const resultScreenPos = ((activeArea / 100) * (globalState.testData[globalState.trial].result)) + paddingL;
    // AA
    if (globalState.trialTimeLeft <= 0) {
        globalState.trialResults.timedOut = true;
    }
    // If the Beam covers the hint
	else if (resultScreenPos > globalState.beamLeft && resultScreenPos < globalState.beamRight && globalState.trialTimeLeft > 0) {
	    // If the level is a tutorial one
	    if (globalState.level === 1) {
	        // Set that tutorial level to complete
	        globalState.tutorialResults[globalState.trialNumber.toString()] = true;
	    }
        //Set the success to true
        globalState.trialResults.success = true;
        // Get the power as a positive number and add on 1 point min
        globalState.trialResults.actualScore = (reverseNumber(Math.round(globalState.playerSettings.power), 10, 100));
        // If we are on punishment round
        if (Number(globalState.level) === 6) {
            // Double the score
            globalState.trialResults.actualScore = globalState.trialResults.actualScore * 2
        }
        // Round down to 1-10
        globalState.trialResults.score = Math.round(globalState.trialResults.actualScore/10);
        // If this is higher than previous high score
        if (globalState.highestScore < globalState.trialResults.score) {
            // Set the new high score
            globalState.highestScore = globalState.trialResults.score
        }
        // Add this score to total score
        globalState.totalScore += globalState.trialResults.score;
        // Set the reward to null
	    let reward = null;
	    // If we are recording the reward
	    if (globalState.countReward) {
	        // Calculate the Reward
            globalState.reward = Math.floor(globalState.totalScore/globalState.rewardDivision);
	    }
    }
    // Otherwise if we are on the punishment round
    else if (Number(globalState.level) === 6) {
        globalState.trialResults.actualScore = (reverseNumber(Math.round(globalState.playerSettings.power), 10, 100)-100)
        globalState.trialResults.score = Math.round(globalState.trialResults.actualScore/10);
        // If the actual score is between 0 and -10
        if (globalState.trialResults.actualScore <= 0 && globalState.trialResults.actualScore > -9.9) {
            // Set the Score to negative 1
            globalState.trialResults.score = -1
        }
        // Add this score to total score
        globalState.totalScore += globalState.trialResults.score;
	    // Set the reward to null
	    let reward = null;
	    // If we are recording the reward
	    if (globalState.countReward) {
	        // Calculate the Reward
            globalState.reward = Math.floor(globalState.totalScore/globalState.rewardDivision);
	    }
    }
}

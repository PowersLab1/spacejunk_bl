import { movers } from "./handleMovement.js";
import { resetPlayer } from "./resetPlayer.js";
import { calculateScore } from "./calculateScore.js";
import { generateNumber, reverseNumber } from "./utilities.js";
import { saveScore } from "./saveScore.js";
 
export const keyBoardInputs = {
	keyDown: (e, globalState) => {
		if (e.key === "ArrowRight" || e.key === "d" || e.key === "Right") {
			movers.moveRight(globalState.playerSettings);
		}
		else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "Left") {
			movers.moveLeft(globalState.playerSettings);
		}
		else if (e.key === "ArrowUp" || e.key === "w" || e.key === "Up") {
			movers.moveUp(globalState.playerSettings);
		}
		else if (e.key === "ArrowDown" || e.key === "s" || e.key === "Down") {
			movers.moveDown(globalState.playerSettings);
		}
	},
	keyUp: (e, globalState) => {
		if (
	        e.key === 'Right' ||
    		e.key === 'ArrowRight' ||
    		e.key === 'Left' ||
    		e.key === 'ArrowLeft' ||
    		e.key === 'Up' ||
    		e.key === 'ArrowUp' ||
    		e.key === 'Down' ||
    		e.key === 'ArrowDown' ||
    		e.key === "w" ||
    		e.key === "a" ||
    		e.key === "s" ||
    		e.key === "d"
    		) {
			stopMovement(globalState.playerSettings);
		}		
		else if (
		    e.key ===" " || 
		    e.key === "Enter"
		    ) {
			Progress(globalState);
	    }
	}	
}

function stopMovement(settings) {
	settings.dx = 0;
	settings.dy = 0;
}

export const touchInputs = {
	touchDown: (e, globalState) => {
		globalState.mouseDown = true;
		let X = e.targetTouches[0].clientX - globalState.rect.left;
		let Y = e.targetTouches[0].clientY - globalState.rect.top;
		// If the Click is within the Progress button
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.progressButtonArea.x && X < (globalState.progressButtonArea.w + globalState.progressButtonArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.progressButtonArea.y && Y < (globalState.progressButtonArea.h + globalState.progressButtonArea.y)
		) {
			Progress(globalState);
		}
		// If the click is within the Back button
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.backButtonArea.x && X < (globalState.backButtonArea.w + globalState.backButtonArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.backButtonArea.y && Y < (globalState.backButtonArea.h + globalState.backButtonArea.y)
		) {
			GoBack(globalState);
		}
		if (
			globalState.gameState === "TUTORIAL" ||
			(globalState.gameState === "GAME" && globalState.trialState === "TRIAL")
			) {
			// If the click is within the Up Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.upArrowArea.x && X < (globalState.upArrowArea.w + globalState.upArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.upArrowArea.y && Y < (globalState.upArrowArea.h + globalState.upArrowArea.y)
			) {
				// Increase Power
				movers.moveUp(globalState.playerSettings);
			}
			// If the click is within the Down Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.downArrowArea.x && X < (globalState.downArrowArea.w + globalState.downArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.downArrowArea.y && Y < (globalState.downArrowArea.h + globalState.downArrowArea.y)
			) {
				// Decrease Power
				movers.moveDown(globalState.playerSettings);
			}
			// If the click is within the Left Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.leftArrowArea.x && X < (globalState.leftArrowArea.w + globalState.leftArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.leftArrowArea.y && Y < (globalState.leftArrowArea.h + globalState.leftArrowArea.y)
			) {
				// Move Left
				movers.moveLeft(globalState.playerSettings);
			}
			// If the click is within the Right Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.rightArrowArea.x && X < (globalState.rightArrowArea.w + globalState.rightArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.rightArrowArea.y && Y < (globalState.rightArrowArea.h + globalState.rightArrowArea.y)
			) {
				// Move Right
				movers.moveRight(globalState.playerSettings);
			}
		}
	},
	touchUp: (e, globalState) => {
		if (globalState.mouseDown === true) {
			globalState.mouseDown = false;
			stopMovement(globalState.playerSettings);
		}
	}
}

export const mouseInputs = {
	mouseDown: (e, globalState) => {
		globalState.mouseDown = true;
		let X = e.clientX - globalState.rect.left;
		let Y = e.clientY - globalState.rect.top;
		// If the Click is within the Progress button
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.progressButtonArea.x && X < (globalState.progressButtonArea.w + globalState.progressButtonArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.progressButtonArea.y && Y < (globalState.progressButtonArea.h + globalState.progressButtonArea.y)
		) {
			Progress(globalState);
		}
		// If the click is within the Back button
		if (
			// If X is more than left of arrow x and less than its width
			X > globalState.backButtonArea.x && X < (globalState.backButtonArea.w + globalState.backButtonArea.x) 
			&&
			// If Y is more than top of arrow base and less than its height
			Y > globalState.backButtonArea.y && Y < (globalState.backButtonArea.h + globalState.backButtonArea.y)
		) {
			GoBack(globalState);
		}
		if (
			globalState.gameState === "TUTORIAL" ||
			(globalState.gameState === "GAME" && globalState.trialState === "TRIAL")
			) {
			// If the click is within the Up Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.upArrowArea.x && X < (globalState.upArrowArea.w + globalState.upArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.upArrowArea.y && Y < (globalState.upArrowArea.h + globalState.upArrowArea.y)
			) {
				// Increase Power
				movers.moveUp(globalState.playerSettings);
			}
			// If the click is within the Down Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.downArrowArea.x && X < (globalState.downArrowArea.w + globalState.downArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.downArrowArea.y && Y < (globalState.downArrowArea.h + globalState.downArrowArea.y)
			) {
				// Decrease Power
				movers.moveDown(globalState.playerSettings);
			}
			// If the click is within the Left Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.leftArrowArea.x && X < (globalState.leftArrowArea.w + globalState.leftArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.leftArrowArea.y && Y < (globalState.leftArrowArea.h + globalState.leftArrowArea.y)
			) {
				// Move Left
				movers.moveLeft(globalState.playerSettings);
			}
			// If the click is within the Right Arrow
			if (
				// If X is more than left of arrow x and less than its width
				X > globalState.rightArrowArea.x && X < (globalState.rightArrowArea.w + globalState.rightArrowArea.x) 
				&&
				// If Y is more than top of arrow base and less than its height
				Y > globalState.rightArrowArea.y && Y < (globalState.rightArrowArea.h + globalState.rightArrowArea.y)
			) {
				// Move Right
				movers.moveRight(globalState.playerSettings);
			}
		}
	},
	mouseUp: (e, globalState) => {
		if (globalState.mouseDown === true) {
			globalState.mouseDown = false;
			stopMovement(globalState.playerSettings);
		}
	}
}

let firstPress = true;
let interval;
function Progress(globalState) {
	switch(globalState.gameState) {
		case "INTRO":
			firstPress = false;
			if (globalState.currentPage < globalState.introPages.length -1) {
				globalState.currentPage++;
				// y = globalState.canvasHeight - ((globalState.canvasHeight/10)*9);
			}
			else if (globalState.currentLine < globalState.gameIntroduction.length -1) {

				globalState.currentLine++
			}
			else {
				globalState.currentPage = 0;
				globalState.currentLine = 0;
				resetPlayer(globalState);
				globalState.gameState = "TUTORIAL";
			}
			break;
			
		case "TUTORIAL":
		    globalState.tutorialRetry = 0;
			firstPress = false;
			if (globalState.currentPage < globalState.tutorialPages.length -1) {
			    globalState.playerSettings.beamActive = false;
			    globalState.playerSettings.power = 10;
				globalState.currentPage++
			}
			else if (globalState.currentLine < globalState.gameTutorial.length -1) {
			    globalState.playerSettings.beamActive = false;
			    globalState.playerSettings.power = 10;
				globalState.currentLine++
			}
			else {
				globalState.currentPage = 0;
				globalState.currentLine = 0;
				globalState.gameState = "GAME";
				resetPlayer(globalState);
			}
			break;

		case "GAME":
			switch(globalState.trialState) {
				case "INTRO":
					if (globalState.currentPage < globalState.levelPages.length -1) {
						globalState.currentPage++
					}
					else {
						globalState.currentPage = 0;
						globalState.currentLine = 0;
				    	globalState.trialState = "HINT";
					}
				
				break;
				
				case "WARNING":
					if (globalState.currentPage < globalState.difficultyPages.length -1) {
						globalState.currentPage++
					}
					else if (globalState.currentLine < globalState.difficultyWarning.length -1) {
						globalState.currentLine++
					}
					else {
						globalState.currentPage = 0;
						globalState.currentLine = 0;
						// Send the Person on to the redo screen
						globalState.trialState = "REDO_TUTORIAL";
					}

				break;
				
				case "TUTORIAL_FAILED":
				    globalState.trialState = "INTRO";
				    
			    break;
				
				case "REDO_TUTORIAL":
					if (globalState.currentPage < globalState.tutorialRestartPages.length -1) {
						globalState.currentPage++
					}
					else {
						globalState.currentPage = 0;
						globalState.currentLine = 0;
					// Send the Person on to the normal game
					globalState.trialState = "INTRO";
					}

				break;

				case "HINT":
					globalState.trialState = "TRIAL"
					// Reset the Player (mainly for the Reset the Hint y position)
					resetPlayer(globalState);
					// Collect the MS time now for trial time calculations
					globalState.trialResults.trialStartTime = 0;
					globalState.trialResults.trialStartTime = Date.now();
					// Set a timeout so if the player takes longer than a certain time in the trial it will automatically progress
					interval = setInterval(() => {
						globalState.trialTimeLeft--;
						if (globalState.trialTimeLeft == -1 || globalState.trialTimeLeft < -1) {
							Progress(globalState);
							clearInterval(interval);
						}
					}, 1000);
					break;

				case "TRIAL":
				    if (globalState.trialTimeLeft > 0) {
    				    // If the beam is inactive but progress has been pressed
    				    if (globalState.beamNeedsActivation && !globalState.playerSettings.beamActive) {
    				        // Set that the Beam has been pressed when inactive
    				        globalState.playerSettings.inactivePress = true;
    				        break;
    				    }
				    }
					// Collect the MS time now for trial time calculations
					globalState.trialResults.trialEndTime = 0;
					globalState.trialResults.trialEndTime = Date.now();
					// Calculate the Score of the Trial
					calculateScore(globalState);
					// Move the trial to the results state
					globalState.trialState = "RESULTS"
					// Clear any remaining timer
					clearInterval(interval)
					break;
					
				case "RESULTS":
					// Remove the interval Timer
					clearInterval(interval)
					// If we timed out
					if (globalState.trialTimeLeft <= 0 && globalState.repeatTrialOnTimeout) {
					    // Reset the player but set timedOut to true
					    resetPlayer(globalState, true);
					    // We want to repeat the trial
    					globalState.trialResults.trialStartTime = 0;
    					globalState.trialResults.trialStartTime = Date.now();
    					// Set a timeout so if the player takes longer than a certain time in the trial it will automatically progress
    					interval = setInterval(() => {
    						globalState.trialTimeLeft--;
    						if (globalState.trialTimeLeft == -1 || globalState.trialTimeLeft < -1) {
    							Progress(globalState);
    							clearInterval(interval);
    						}
    					}, 1000);
					    // Set the Trial State back to the Trial
					    globalState.trialState = "TRIAL";
					    // Break out of the switch
					    break;
					}
				    // If we are in the Tutorial Level and we are checking if they passed every trial and they are at the end of the Tutorial
				    if (globalState.tutorialRetry < globalState.tutorialMaxRetries &&
				        globalState.trial + 1 < globalState.testData.length &&
				        (globalState.level === 1 && 
				        globalState.tutorialPassAllTrials && 
				        globalState.trial + 1 >= globalState.testData.length || 
						Number(globalState.testData[globalState.trial + 1].level) !== Number(globalState.level)
						)) {
    			          // If we didn't pass one of the tutorial trials
    				      if (!globalState.tutorialResults["1"] || !globalState.tutorialResults["2"] || !globalState.tutorialResults["3"]) {
				            // Go to the "TUTORIAL_FAILED SCREEN"
				            globalState.trialState = "TUTORIAL_FAILED";
				            globalState.trial = 0;
				            globalState.trialNumber=1;
				            // Reset the total score
				            globalState.totalScore = 0;
                        	// Highest Score the player got
                        	globalState.highestScore = 0;
                        	globalState.tutorialRetry += 1;
        			     //   // resetPlayer(globalState);
        					break;
					  }
				    }
					// If the User has not re-done the tutorial and they are not in the tutorial level
					if (!globalState.tutorialReDo && globalState.level !== 1) {
					    // Save their score
    					saveScore({
    					    tutorialRepeated: globalState.tutorialReDo,
    					    trialName: globalState.trialName,
    			        	originalHint: globalState.testData[globalState.trial].originalHint,
                        	originalResult: globalState.testData[globalState.trial].originalResult,
                            // Final Positions of Participant
                        	participantPosition: ((globalState.playerSettings.x - (globalState.rockArea.leftX + globalState.rockArea.w))/(globalState.canvasWidth - ((globalState.rockArea.leftX + globalState.rockArea.w)+ (globalState.canvasWidth - globalState.rockArea.rightX))))*100,
                        	participantConfidence: reverseNumber(globalState.playerSettings.power, 10, 100),
                        	success: globalState.trialResults.success,
                        	level: Number(globalState.testData[globalState.trial].level),
                        	distanceMovedX: (globalState.trialResults.movementX / globalState.activeArea)*100,
                        	distanceMovedY: globalState.trialResults.movementY,
                        	trialScore: globalState.trialResults.score,
                        	actualTrialScore: globalState.trialResults.actualScore,
                        	timeToComplete: globalState.trialResults.trialTime,
                        	timedOut: globalState.trialResults.timedOut,
                        	timedOutCount: globalState.trialResults.timedOutCount,
                        	reward: globalState.reward,
                        	totalScore: globalState.totalScore,
                            originalStartPos: ((globalState.playerSettings.originalStartPos - (globalState.rockArea.leftX + globalState.rockArea.w))/(globalState.canvasWidth - ((globalState.rockArea.leftX + globalState.rockArea.w)+ (globalState.canvasWidth - globalState.rockArea.rightX))))*100,
    					})
					}
				    // Reset the Player
					resetPlayer(globalState);
					// If we are on the last trial of the level
					if (globalState.trial + 1 >= globalState.testData.length || 
							Number(globalState.testData[globalState.trial + 1].level) !== Number(globalState.level)
						) {
						    globalState.trialState = "LEVEL_COMPLETE";
					}
					else {
						globalState.trialNumber ++;
    					if (globalState.hintEveryTrial) {
					    	globalState.trialState = "HINT";
    					}
    					else {
        					// Collect the MS time now for trial time calculations
        					globalState.trialResults.trialStartTime = 0;
        					globalState.trialResults.trialStartTime = Date.now();
        					// Set a timeout so if the player takes longer than a certain time in the trial it will automatically progress
        					interval = setInterval(() => {
        						globalState.trialTimeLeft--;
        						if (globalState.trialTimeLeft == -1 || globalState.trialTimeLeft < -1) {
        							Progress(globalState);
        							clearInterval(interval);
        						}
        					}, 1000);
    					    globalState.trialState = "TRIAL";
    					}
					}
					// Increase the Trial Number
					globalState.trial ++;		
					// Generate a new piece of Junk
					globalState.junkNumber = generateNumber(1,7);
					break;
            
                case "LEVEL_COMPLETE":
                    // If we are on the final trial
    			    if (globalState.trial >= globalState.testData.length) {
    			        // Set Game Over
        				globalState.gameState = "GAME_OVER";
        				globalState.trialState = "GAME_OVER";
    	    		}
    	    		// Otherwise, if it is the tutorial
					else if (globalState.level === 1) {
						globalState.level = Number(globalState.testData[globalState.trial].level)
						// Move to the "This game is hard" screen
						globalState.trialState = "WARNING";
						// If we are supposed to reset the total score after the tutorial
						if (globalState.resetTotalAfterTutorial) {
            	            // Reset the total score
            	            globalState.totalScore = 0;
                        	// Highest Score the player got
                        	globalState.highestScore = 0;
						}
					}
        			else {
        				globalState.level = Number(globalState.testData[globalState.trial].level)
        				// Reset the Trial
        				globalState.trialState = "INTRO";
        				// Set the Trial Number back to 1
        				globalState.trialNumber = 1;
    			    }
			        break;

		        case "GAME_OVER":
		            globalState.gameState = "GAME_OVER";
    		
    		        break;
                }
			break;
			
			case "GAME_OVER":
				window.dispatchEvent(new CustomEvent("completed"));
				localStorage.setItem("completed", true);
                break;
		default:
			globalState.gameState = "INTRO"
			break;
	}
}


/**
 * Functionality to allow the back button to work
 * 
 * @param {object} globalState 
 */
function GoBack(globalState) {
	switch(globalState.gameState) {
		case "INTRO":
			firstPress = false;
			if (globalState.currentPage < 0) {
				globalState.currentPage--;
			}
			break;
			
			case "TUTORIAL": 
			firstPress = false;
			if (globalState.currentLine > 0) {
				globalState.currentLine--;
			}
			else if (globalState.currentPage > 0) {
				globalState.currentPage--;
				globalState.currentLine = 0;
			}
			else if (globalState.currentPage === 0) {
				globalState.gameState = "INTRO"
				globalState.currentPage = globalState.gameIntroduction.length -1;
				globalState.currentLine = 0;
				globalState.backButtonArea = {
					x: 0,
					y: 0,
					w: 0,
					h: 0,
				}
			}
			break;

			case "GAME":
				if (globalState.trialState === "REDO_TUTORIAL") {
					globalState.level = 1;
					globalState.trialNumber = 1;
					globalState.trial = 0;
					// Score of all trials combined
					globalState.totalScore = 0,
					// Highest Score the player got
					globalState.highestScore = 0,
					globalState.gameState = "TUTORIAL";
					globalState.trialState = "INTRO";
					globalState.tutorialReDo = true;
				}
				
				else if (globalState.trialState === "RETURN") {
					globalState.trialState = "INTRO"
				}
			break;
		}
}

// module.exports = {keyBoardInputs, mouseInputs, touchInputs};
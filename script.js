import { runGame, mouseInputs, touchInputs, keyBoardInputs, clearCanvas } from "./scripts/runGame.js";
import { globalState } from "./scripts/settings.js"
import { getData } from "./scripts/getData.js";
import { portraitProtection } from "./scripts/renderScreen.js";
import { resetPlayer } from "./scripts/resetPlayer.js";
import { calculateRockPos } from "./scripts/drawImages.js";

// Gets the Canvas from the HTML
const canvas = document.getElementById("canvas");

// Creates the Drawing Hook in 2d
const ctx = canvas.getContext("2d");

const canvasFudge = 0
canvas.width = window.innerWidth + canvasFudge
canvas.height = window.innerHeight + canvasFudge
globalState.canvasWidth = window.innerWidth + canvasFudge
globalState.canvasHeight = window.innerHeight + canvasFudge
if (globalState.canvasWidth / 2.3 > globalState.canvasHeight) { globalState.canvasWidth = globalState.canvasHeight * 2.2 }
globalState.rect = canvas.getBoundingClientRect();

document.addEventListener("touchstart", (e) => {
    touchInputs.touchDown(e, globalState);
    e.preventDefault();
});
document.addEventListener("touchend", (e) => {
    touchInputs.touchUp(e, globalState);
    e.preventDefault();
});
document.addEventListener("mousedown", (e) => {
    mouseInputs.mouseDown(e, globalState)
    e.preventDefault();
});
document.addEventListener("mouseup", (e) => {
    mouseInputs.mouseUp(e, globalState)
    e.preventDefault();
});
document.addEventListener("keydown", (e) => { keyBoardInputs.keyDown(e, globalState) });
document.addEventListener("keyup", (e) => { keyBoardInputs.keyUp(e, globalState) });

export function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

window.dispatchEvent(new CustomEvent("scriptLoaded"));

export function thisTry(globalState, ctx) {
    // If the Screen Resolution changes, reset it, reset the player and redraw the rocks position
    if (globalState.canvasWidth !== window.innerWidth + canvasFudge || globalState.canvasHeight !== window.innerHeight + canvasFudge) {
        globalState.canvasWidth = window.innerWidth + canvasFudge;
        canvas.width = window.innerWidth + canvasFudge;
        globalState.canvasHeight = window.innerHeight + canvasFudge;
        canvas.height = window.innerHeight + canvasFudge;
        resetPlayer(globalState);
        calculateRockPos(globalState);
    }

    // The URL for the test data CSV
    const testDataURL = "https://raw.githubusercontent.com/Powers-Lab/space_game_resources/main/true_trial_structure.csv"

    // Get the Data for the test
    getData(testDataURL).then((testData) => {
        globalState.testData = testData;
        clearCanvas(globalState, ctx)
        if (globalState.canvasWidth < globalState.canvasHeight) {
            // console.log("HERE")
            portraitProtection(globalState, ctx);
        }
        else {
            runGame(globalState, ctx)
        }
        if (globalState.gameState !== "GAME_OVER") { requestAnimationFrame(() => thisTry(globalState, ctx)); }
    })

}

thisTry(globalState, ctx);

/**
 * The Global State of the Game
 */
export const globalState = new function () {
	// For Mouse Inputs, Set in the reset player function and at beginning
	this.rect = 0;
	// For Mouse Inputs so mouse up isn't always firing
	this.mouseDown = false;
	// The area of the left Arrow, set in draw images
	this.leftArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the right Arrow
	this.rightArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the up Arrow
	this.upArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the down Arrow
	this.downArrowArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The area of the progress box
	this.progressButtonArea = {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
	},
	// The parsed into pages to be displayed, set in renderScreen, introScreen
	this.introPages = [];
	this.tutorialPages = [];
	this.difficultyPages = [];
	// Beam Left and Right are used to show what the current beams x positions are and are calculated in drawImages, calculateBeamandPower
	this.beamLeft = 0;
	this.beamRight = 0;
	// Current Power is used to show the actual power of the beam once all side calculations are accounted for, it is set in drawImages, calculateBeamandPower and reset in resetPlayer
	this.currentPower = 50;
	// Current Page and Line are used by the intro and tutorial screens to page through the introduction texts
	this.currentPage = 0;
	this.currentLine = 0;
	// Text font is used to set the font the game uses
	this.textFont = "VT323"
	this.canvasWidth = 0,
	this.canvasHeight = 0,
	// The state that the overall game is in
	this.gameState = "INTRO",
	// The state that the individual Trial is in
	this.trialState = "INTRO",
	// Score of a single test
	this.score = 0,
	// Score of all trials combined
	this.totalScore = 0,
	// Highest Score the player got
	this.highestScore = 0,
	// What trial is this in the current level
	this.trialNumber = 1,
	// Which trial are we on?
	this.trial = 0,
	// Which level are we on?
	this.level = 1,
	this.readyForNext = false,	
	this.finishedTrial = false,
	this.maxWidth = (this.canvasWidth/20)*19,
	this.minWidth = this.canvasWidth/20
	this.constants = {
		maxLines: Math.floor((this.canvasHeight - (this.canvasHeight - (this.canvasHeight/10)*9))/ (this.canvasHeight/15)),
		textSize: (this.canvasHeight/15) - ((this.canvasHeight/15)/2.5),
	},
	this.playerSettings = {
		w: 50,
		h: 70,
		x: 200,
		y: (this.canvasHeight/5)*3,
		speed: 8,
		dx: 0,
		dy: 0,
		powerSpeed: 2,
		power: 10,
		adaptedPower: 100,
		beamColorActive: "green",
		beamColorDeactivated: "red",
		beamActive: false,
		originalStartPos: 0
	},
	this.hintAnimation = {
		x: 100,
		y: 100,
		size: 30,
		dx: 0,
		dy: 5
	},
    // The Junk we will be displaying (1-7)
	this.junkNumber = 1,
	// This variable is used to set the position of the rocks and the size of the power beam
	// 4 would mean the power size is a quarter of the screen
	this.powerSize = 12
	// Time in ms before trial is moved along
	this.trialTime = 10000;
	// How long left before the trial auto completes (in seconds)
	this.trialTimeLeft = 10;
	this.gameIntroduction = [
		"You have crashed your rocket in space, leaving you stranded on a /n strange planet where spaceships drop off junk such as spare parts /n *PRESS SPACE TO CONTINUE*",];
	this.gameTutorial = [
		"To fix your rocket and escape, you need to catch these spare parts as they are dropped from ABOVE. /n But here's the catch: you can't see the spaceships because they are too /n high above (just above your screen). You  have to guess where the spare parts will drop!!",
		"You need to use your light beam to capture the falling parts. However, you only have a small amount of fuel. Therefore, you want to use the narrowest beam possible. /n You will receive more points if you catch the falling parts with a narrower beam. /n You need at least 50% of the beam to touch a falling part to catch it. /n You will not get any points if you miss it.", 
		"Let’s practice using your beam. /n Press the UP (↑) key to turn on the beam. /n To widen press the UP (↑) key. To narrow press the DOWN (↓) key /n To move the space rover around press the LEFT (←) and RIGHT (→) keys",
	];
	this.trialIntros = [
        "PRACTICE ROUND: /n You will see where the last spaceship dropped spare parts to help with your first guess. /n Once you are happy with your position and beam press the SPACEBAR or click NEXT. /n You must pass all 3 practice turns to continue /n You have 5 seconds per turn",
		"LEVEL 1 INFORMATION: /n NUMBER OF INCOMING SPACESHIPS: 1 spaceship /n SIZE OF INCOMING SPACESHIP: No information /n LOCATION OF INCOMING SPACESHIP: One location",
		"LEVEL 2 INFORMATION: /n NUMBER OF INCOMING SPACESHIPS: 2 spaceships - ONE at a time(!) - watch out in case the spaceship overhead CHANGES to a NEW spaceship /n SIZE OF INCOMING SPACESHIPS: One large, one small. No information about the order /n LOCATION SPACESHIP WILL DROP PARTS FROM: One location likely",
		"LEVEL 3 INFORMATION: /n NUMBER OF INCOMING SPACESHIPS: Multiple spaceships - ONE at a time(!) - watch out for when the spaceship overhead has CHANGED to a NEW spaceship /n SIZE OF INCOMING SPACESHIPS: All around the same size /n LOCATION SPACESHIP WILL DROP PARTS FROM: Location likely to change",
		"LEVEL 4 INFORMATION: /n NUMBER OF INCOMING SPACESHIPS: Multiple spaceships - ONE at a time(!) - watch out for when the spaceship overhead has CHANGED to a NEW spaceship /n SIZE OF INCOMING SPACESHIPS: All different sizes /n LOCATION SPACESHIP WILL DROP PARTS FROM: Location likely to change",
		"LEVEL 5 INFORMATION: /n NUMBER OF INCOMING SPACESHIPS: Multiple spaceships - ONE at a time(!) - watch out for when the spaceship overhead has CHANGED to a NEW spaceship /n SIZE OF INCOMING SPACESHIPS: All different sizes /n LOCATION SPACESHIP WILL DROP PARTS FROM: Location likely to change",
	"LEVEL 6 INFORMATION: /n NUMBER OF INCOMING SPACESHIPS: Multiple spaceships - ONE at a time(!) - watch out for when the spaceship overhead has CHANGED to a NEW spaceship /n SIZE OF INCOMING SPACESHIPS: All different sizes /n LOCATION SPACESHIP WILL DROP PARTS FROM: Location likely to change"];

	this.difficultyWarning = ["Nice work! The game has 4 levels. /n In later levels there will be mutiple spaceships that drop off spare parts. /n  ***One spaceship will finish dropping ALL its spare parts before the next one starts!!*** The spaceships are out of sight just above your screen -- you  need to guess when a new one arrives!",
	                       "Hint: NEW spaceships usually drop parts in NEW locations, and BIGGER spaceships will drop parts over a WIDER area."];
	this.restartTutorialMessage = "The information at the start of each level will give you some hints of what to expect /n Try using the smallest beam possible to get more points /n Click NEXT to start";
	this.tutorialFailedMessage = "Let’s try again. Make sure to activate the beam by pressing the UP (↑) arrow on every turn";
	this.tutorialReDo = false,
	this.trialResults = {
		// Did the Trial Succees
		success: false,
		// What was the score to two decimals
		actualScore: 0,
		// What was the Player Visible Score
		score: 0,
		// How far did they move X
		movementX: 0,
		// How much did they adjust Y
		movementY: 0,
		// Did they time out
		timedOut: false,
		// Number of times they timed out
		timedOutCount: 0,
	},
	// The area inbetween the two rocks
	this.activeArea = 0;
	// Do we show a hint every trial or just on the start of the level?
	this.hintEveryTrial = false;
	// Do we force users to repeat the tutorial if they don't pass each test?
	this.tutorialPassAllTrials = true;
	this.tutorialMaxRetries = 1;
	this.tutorialRetry = 0;
	// Saves a boolean of whether each trial of the tutorial was passed or not
	this.tutorialResults = {
	    "1": false, 
        "2": false,
        "3": false,
	}
	// Does the User have to Repeat a Trial on Timeout
	this.repeatTrialOnTimeout = true;
	// Has the User tried to press progress when the beam isn't active
    this.inactivePress = true;
    // Does the beam need to be actived by the user?
    this.beamNeedsActivation = true;
    // Do we want to reset the total score when finishing tutorial?
    this.resetTotalAfterTutorial = true;
    // Do we have and show a reward?
    this.countReward = true;
    // What are we dividing the total score by for the reward?
    this.rewardDivision = 250;
    // What are we calling the reward?
    this.rewardName = "Bonus";
}

/**
 * The Constant Player Parameters, used for Reset
 */
export const initialSettings = {
	w: 50,
	h: 70,
	x: 20,
	y: (globalState.canvasHeight/5)*3.25,
	speed: 5,
	dx: 0,
	dy: 0,
	powerSpeed: 2,
	power: 50,
	level: 0
}
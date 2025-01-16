# Yale Lab Wrapper for HTML Space Game

## Requirements
Currently the system requires Node V16 or below, with Node V16 recommended.  Using NVM (Node Version Manager) is an easy way to manage multiple node versions and switch between them easily.

## Installation
The packages for this application can be installed using `npm i` with the NPM package manager or with `yarn install` using yarn.

## Running the Application for Development
The application can be run with the command `yarn start` that will start a react development server.


## How the application works
The application itself is based on a ReactJS Webpage that recieves a request from Yales REDCap server.  The application parses information from the request URL and then attempts to load the game.

The game is hosted in the `public`

## LabJSModernWrapper

The LabJS Modern Wrapper uses React Hooks to manage state.

Game State is for the data relating to the trial and other data that will be sent to the AWS Lambda Results function.
State is for the state of the game scripts, such as if the trial is in progress or completed and helps set the rendering state.  It has three states, ADDSCRIPT (which is when the game script is waiting to or has been triggered to load), PLAYING (when the scripts have loaded and the trail can run), COMPLETED (for when the trial has completed and the save data needs to be sent)
Attempts holds data on how many times a save has tried to send, it will try 10 times before stopping retries
Success holds data on if the data has been sent successfully

### Data packet that goes to the RedCap

Two fields are sent to RedCap in the `saveTaskData` function; `encrypted_metadata` which is the run id of the trial and `data` which contains (based on how the previous `LabJsWrapper` was setup); `encrypted_metadata` (again), `survey_url` (which is the redirect URL for when the trial is completed), and `data` which holds an array of JSON objects of all of the Game data.

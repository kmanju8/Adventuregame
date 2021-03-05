import shuffleArray, multiChoiceBat from "multichoice.js";

const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// JSON file parsing containing story decision logic and dialogue

const fs = require('fs');
let rawstep = fs.readFileSync('steps.json');
const steps = JSON.parse(rawstep);

function startGame() {

  let currentStep = "start"; 

  function logStep() {
    const step = steps[currentStep];

    if (step) {
      readline.question(`${step.message || ""} `, (input) => {
        handleAnswer(input);

      });
    }
  }

  function handleAnswer(answer) {
    let step;

    if (answer == steps[currentStep].message) {
      console.log("Nice try."); 
    } else if (answer in steps[currentStep]){
      step = steps[currentStep][answer];
    } else if ("default" in steps[currentStep]) {
      step = steps[currentStep].default;
    } else if (answer.toLowerCase() === "fight") {
      startFight();
    } else if (answer.toLowerCase() === "continue") {
      step = "continue";
    } else {
      step = "end";
    }

    if (typeof step === "function") {
      step();
      return; 
    }

    if (typeof step === "string") {
      currentStep = step;
    } else {
      currentStep = "end";
    }
    logStep();
  }

  function startFight() {
    console.log("The fight occurs");
    readline.question("You have completed your first fight! Type 'continue' to proceed... ", function (response) { 
    handleAnswer(response)
  })}

  console.clear();
  logStep();
}


startGame(); 
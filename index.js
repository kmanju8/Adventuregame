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
    } else {
      step = "end";
    }
    
    //had an idea for calling other funcions, will try to implement
    
    /*if (answer === "yes") {
      step = steps[currentStep][answer];
    } else if (answer === "A" || answer === "B" || answer === "C" || answer === "D" ) { 
        console.log("Multichoice works!")
        step = steps[currentStep].yes;
    } else if (answer === "no") {
      step = steps[currentStep].answer;
    } else {
      steps[currentStep].general;
    }*/

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

  console.clear();
  logStep();
}

startGame();
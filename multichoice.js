import * as char from "./charactersClass.js"
import {shuffleArray, multiChoiceBat} from "./multichoice.js";
import { createRequire } from 'module';
import { moveMessagePortToContext } from "node:worker_threads";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);



// prompt sync 

// import promptSync from 'prompt-sync';
// const prompt = promptSync({sigint: true});

// readline

const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// JSON file parsing containing story decision logic and dialogue

const fs = require('fs');
let rawstep = fs.readFileSync('steps.json');
const steps = JSON.parse(rawstep);

// start game

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

  // story function 

    function handleAnswer(answer) {
    let step;

    if (answer == steps[currentStep].message) {
      console.log("Nice try."); 
    } else if (answer in steps[currentStep]){
      step = steps[currentStep][answer];
    } else if ("default" in steps[currentStep]) {
      step = steps[currentStep].default;
    } else if (answer.toLowerCase() === "fight") {
      char.chooseEnemy();
      startFight();
      console.log('Fight is finished!')
    } else if (answer.toLowerCase() === "continue") {
      step = "continue";
    } else {
      step = "end";
    }

    /* if (typeof step === "function") {
      step();
      return; 
    } */ 

    if (typeof step === "string") {
      currentStep = step;
    } else {
      currentStep = "end";
    }
    logStep();
  }

    const trivia = () => {
        return new Promise((resolve, reject) => {
          readline.question("To win this fight, you must correctly answer a trivia question. What difficulty do you choose? easy/medium/hard ", (answer) => {
              multiChoiceBat(answer);
              resolve()
        })
        })
    }

    /* const moveOn = () => {
        return new Promise((resolve, reject) => {
          readline.question("You have completed your fight! Enter continue to proceed...", (answer) => {
            handleAnswer(answer)
            resolve()
          })
        })
      } */ 


    
    

    const startFight = async () => {
    try {
        await trivia();
    } catch (err) {
        console.log("Error!")
    }
    }

    console.clear();
    logStep();
};

startGame()


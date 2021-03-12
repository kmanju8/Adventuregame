import * as char from "./charactersClass.js"

import { createRequire } from 'module';
import { moveMessagePortToContext } from "node:worker_threads";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);


import promptSync from 'prompt-sync';
var prompt = require('prompt-sync')();


const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

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

  //Function takes difficulty input. Depending on choice of difficulty, damage output is changed.
//Function returns damage done. If positive, damage applied to enemy, if negative, applied to player.
  async function multiChoiceBat(){

  const fetch = require('node-fetch');
  
  const temp = prompt("To win this fight, you must correctly answer a trivia question. What difficulty do you choose? easy/medium/hard ");
  
  
  let damage=0;
  let correct = false;
  //choice will be user choice of difficulty, to change damage output
  fetch("https://opentdb.com/api.php?amount=2&difficulty=".concat(temp,"&encode=url3986"))
  .then(request=>request.json()).then(function(data){
  
    const difficulty = data.results[0].difficulty;
    const answers = data.results[0].incorrect_answers;
    answers.push(data.results[0].correct_answer);
    shuffleArray(answers);
    console.log(decodeURIComponent(data.results[0].question));
    for(const i in answers){
        console.log((parseInt(i)+1),")",decodeURIComponent(answers[i]));
    }
    
    let ans = prompt()
    if(answers[parseInt(ans)-1]===data.results[0].correct_answer){
        switch(difficulty){
            case "easy":
                damage = 3;
                break;
            case "medium":
                damage = 5;
                break;
            case "hard":
                damage = 7;
                break;
  
        }
        correct = true;
        console.log("Correct!")
    } else{
        console.log("Incorrect! You take 2 damage.")
        damage = -2;
    }
  }).catch(function () {
    console.log("Whoops, there was an error in the program. Have a free 2 damage on us ;)");
    damage = 2;
  });
  //issue is that whole fetch sequence counts as asynch function. Is added to buffer, the multichoicebat func finishes and everything goes bad.
  
  }

  // story function 

    async function handleAnswer(answer) {
    let step;

    if (answer == steps[currentStep].message) {
      console.log("Nice try."); 
    } else if (answer in steps[currentStep]){
      step = steps[currentStep][answer];
    } else if ("default" in steps[currentStep]) {
      step = steps[currentStep].default;
    } else if (answer.toLowerCase() === "fight") {
      char.chooseEnemy();
      multiChoiceBat().then(step="continue");
    } else if (answer.toLowerCase() === "continue") {
      step = "continue";
    } else {
      step = "end";
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
};

startGame(); 


import { createRequire } from 'module';
import { monitorEventLoopDelay } from 'perf_hooks';
import promptSync from 'prompt-sync';

const require = createRequire(import.meta.url);
var prompt = require('prompt-sync')();


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//Function takes difficulty input. Depending on choice of difficulty, damage output is changed.
//Function returns damage done. If positive, damage applied to enemy, if negative, applied to player.
export function multiChoiceBat(){

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


}

//Use this to test if function works by running multichoice.js  
//multiChoiceBat("easy");


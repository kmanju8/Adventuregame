const fetch = require('node-fetch');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var damage;
var correct = false;
fetch("https://opentdb.com/api.php?amount=10")
.then(request=>request.json()).then(function(data){

    const answers = data.results[0].incorrect_answers;
    answers.push(data.results[0].correct_answer);
    shuffleArray(answers);
    console.log(data.results[0].question);
    for(const i in answers){
        console.log((parseInt(i)+1),")",answers[i]);
    }
    
    readline.question("", ans => {
        if(answers[parseInt(ans)-1]===data.results[0].correct_answer){
            correct = true;
            console.log("correct!")
        } else{
            console.log("Incorrect! You take 2 damage.")
        }
        readline.close();
    })
}).catch(function () {
    console.log("Promise Rejected");
});
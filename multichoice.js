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
fetch("https://opentdb.com/api.php?amount=10")
.then(request=>request.json()).then(function(data){
    const answers = data.incorrect_answers.concat(data.correct_answer);
    shuffleArray(answers);
    console.log(data.results[0].question);
    for(const i of answers){
        console.log(i);
    }
    
    readline.question(data.results[0].question, ans => {
        console.log(ans);
        readline.close();
    })
}).catch(function () {
    console.log("Promise Rejected");
});
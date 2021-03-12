
class Character {
    constructor(name, id, health) {
        this.name = name;
        this.id = id;
        this.health = health;  
    } 
    takeDamage(damage){
        this.health -= damage;
    } 
};

class Enemy extends Character {
    constructor(name, id, health, intelligence) {
        super(name, id, health);
        this.intelligence = intelligence; // change this 
    }

};

class Player extends Character {
    constructor(name, id, health, someotherproperty) {
        super(name, id, health, age);
        this.items=[];
        this.money=0;
    }
};

// create instance of player
let player = new Player("name", 1, 100)


 let hannibal = new Enemy("Hannibal", 0 , 5); 
 let norman = new Enemy("Norman", 1 , 10); 
 let igor = new Enemy("Igor", 2 , 20)


let enemy;
function chooseEnemy() {

    let random = Math.round(Math.random() * 2); 

    switch(random) {
        case 0: 
            enemy = hannibal;
            console.log("You are battling Hannibal. ");
            console.log(enemy);
            break;
        case 1:
            enemy = norman;
            console.log("You are battling Norman. "); 
            console.log(enemy);
            break;
        case 2:
            enemy = igor;
            console.log("You are battling Igor. "); 
            console.log(enemy);
            break;
        default:
            console.log('Oops!')
            break;
    }

};


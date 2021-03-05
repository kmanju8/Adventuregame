
class Character {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
   
};

class Enemy extends Character {
    constructor(name, id, intelligence) {
        super(name, id);
        this.intelligence = intelligence; // change this 
    }
};

class Player extends Character {
    constructor(name, id, someotherproperty) {
        super(name, id, age);
        this.someotherproperty = someotherproperty; // change this
    }
};


 let hannibal = new Enemy("Hannibal", 0); 
 let norman = new Enemy("Norman", 1); 
 let igor = new Enemy("Igor", 2)


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



export class Character {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
   
};

export class Enemy extends Character {
    constructor(name, id, intelligence, strength) {
        super(name, id);
        this.intelligence = intelligence; 
        this.strength = strength;
        this.health = 100;
    }
};

export class Player extends Character {
    constructor(name, id, someotherproperty) {
        super(name, id, age);
        this.someotherproperty = someotherproperty; // change this
    }
};


 export let hannibal = new Enemy("Hannibal", 0, 6, 4, 100); 
 export let norman = new Enemy("Norman", 1, 3, 8, 100); 
 export let igor = new Enemy("Igor", 2, 4, 9, 100)



export function chooseEnemy() {
    let enemy;
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


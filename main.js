// Part 1: Humble Beginnings
// Creating the adventurer object
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      belongings: ["small hat", "sunglasses"]
    }
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
};

// Logging each item in Robin's inventory
adventurer.inventory.forEach(item => console.log(item));

// Testing the roll method
adventurer.roll();


// Part 2: Class Fantasy
// Creating a Character class
class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
}

// Recreating Robin using the Character class
const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];
robin.companion = new Character("Leo");
robin.companion.type = "Cat";
robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

// Testing roll method on companions
robin.companion.roll();
robin.companion.companion.roll();


// Part 3: Class Features
// Creating Adventurer class that extends Character
class Adventurer extends Character {
  constructor(name, role) {
    super(name);
    this.role = role;
    this.inventory.push("bedroll", "50 gold coins");
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}

// Creating Companion class that extends Character
class Companion extends Character {
  constructor(name, type) {
    super(name);
    this.type = type;
  }
}

// Recreating Robin and companions using new classes
const robinAdventurer = new Adventurer("Robin", "Fighter");
const leoCompanion = new Companion("Leo", "Cat");
const frankCompanion = new Companion("Frank", "Flea");
frankCompanion.inventory = ["small hat", "sunglasses"];
leoCompanion.companion = frankCompanion;
robinAdventurer.companion = leoCompanion;


// Part 4: Class Uniforms
// Adding static properties to classes
class CharacterWithStatic {
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = CharacterWithStatic.MAX_HEALTH;
    this.inventory = [];
  }
}

class AdventurerWithStatic extends CharacterWithStatic {
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role) {
    if (!AdventurerWithStatic.ROLES.includes(role)) {
      throw new Error(`Invalid role: ${role}`);
    }
    super(name);
    this.role = role;
    this.inventory.push("bedroll", "50 gold coins");
  }
}


// Part 5: Gather your Party
// Creating an AdventurerFactory
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find(a => a.name === name);
  }
}

const healerFactory = new AdventurerFactory("Healer");
const robinHealer = healerFactory.generate("Robin");


// Part 6: Developing Skills
// Adding duel method to Adventurer class
Adventurer.prototype.duel = function (opponent) {
  while (this.health > 50 && opponent.health > 50) {
    const myRoll = this.roll();
    const opponentRoll = opponent.roll();

    if (myRoll > opponentRoll) {
      opponent.health--;
    } else if (opponentRoll > myRoll) {
      this.health--;
    }

    console.log(`${this.name} has ${this.health} health left.`);
    console.log(`${opponent.name} has ${opponent.health} health left.`);
  }

  const winner = this.health > 50 ? this.name : opponent.name;
  console.log(`${winner} wins the duel!`);
};

// Testing duel method
const robinFighter = new Adventurer("Robin", "Fighter");
const rivalFighter = new Adventurer("Rival", "Fighter");
robinFighter.duel(rivalFighter);

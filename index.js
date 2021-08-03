
// game characters 

class Hero {
    static description = 'Class that describes characteristics of a hero';

    static strengthComparison(value, magnitude) {
        return `First Hero is stronger than another one by ${value - magnitude} points`;
    }

    constructor({ name, level, dexterity, vitality } = {}) {
        this._name = name;
        this._level = level;
        this._dexterity = dexterity;
        this._vitality = vitality;
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }
}

class Magician extends Hero {
    constructor({ magic, ...restProps } = {}) {
        super(restProps);

        this.magic = magic
    }
}

class Warrior extends Hero {
    constructor({strength, ...restProps} = {}) {
        super(restProps);

        this.strength = strength;
    }

    showsHisStrength() {
        return `Warrior ${this.name} has strength of ${this.strength} points`;
    }
}

class Barbarian extends Warrior {
    constructor({ weapon, ...restProps } = {}) {
        super(restProps);

        this.weapon = weapon;
    }

    attacks() {
        return `Barbarian ${this.name} attacks using ${this.weapon}`;
    }
}

const boris = new Barbarian({
    name: 'Boris',
    level: 3,
    dexterity: 40,
    vitality: 75,
    strength: 60,
    weapon: 'sword'
});

console.log(Hero.description);
console.log(Hero.strengthComparison(100, 10));

console.log(boris);
console.log(boris.attacks());
console.log(boris.level);
console.log(boris.showsHisStrength());

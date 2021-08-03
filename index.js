class Car {
    static WHEELS_COUNT = 4;

    constructor(type, wheelPrice) {
        this.property = 123;
        this.type = type;
        this.wheelPrice = wheelPrice;
    }

    static myMethod() {
        return this.type;
    }

    getWheelsPrice() {
        return Car.WHEELS_COUNT * this.wheelPrice;
    }

    getType() {
        return this.type;
    }
};

class ElectroCar extends Car {
    constructor(wheelPrice) {
        super("electro", wheelPrice);
    }
}


const car2 = new ElectroCar(50);
const car3 = new ElectroCar(500);

console.log(car2.getWheelsPrice());
console.log(car3.getWheelsPrice());
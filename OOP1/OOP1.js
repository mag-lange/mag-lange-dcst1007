//Code for OOP1.html

class car {
    constructor(registration, brand, yearModel, speed) {
        this.registration = registration
        this.brand = brand
        this.yearModel = yearModel
        this.speed = speed
    }

    accelerate() {
        console.log("accelerating...")
    }

}

let volvo = new car("BT8713", "volvo", "2005", "50");
let BMW = new car("ZZ1234", "BMW", "2020", "100");
let toyota = new car("EB1829", "toyota", "2019", "80");
let ferrari = new car("BD8938", "ferrari", "2023", "200"); 

console.log(volvo.yearModel)
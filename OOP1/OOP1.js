//Code for OOP1.html
class Car {
    constructor(registration, brand, yearModel, speed, max_speed) {
        this.registration = registration
        this.brand = brand
        this.yearModel = yearModel
        this.speed = speed
        this.max_speed = max_speed
    }
    accelerate() {
        console.log("accelerating " + this.brand +"..." )
        this.speed = this.speed + 10
        return this.speed
    }
    brake() {
        console.log("braking..."+ this.brand +"..." )
        this.speed = this.speed - 10
        return this.speed
    }
}

let cars = [
    volvo = new Car("BT8713", "volvo", "2005", 0, 100),
    bmw = new Car("ZZ1234", "BMW", "2020",0, 150),
    toyota = new Car("EB1829", "toyota", "2019", 0, 60),
    ferrari = new Car("BD8938", "ferrari", "2023", 0, 200)
]

let accelerate_button = document.getElementById("accelerate")
accelerate_button.onclick = () => {
    let carSelection = document.getElementById("carSelection")
    let selectedCar = cars[carSelection.value]; // A bit complex, but I did not find any better solution
    selectedCar.accelerate();
    console.log(selectedCar.speed);
}

let brake_button = document.getElementById("brake")
brake_button.onclick = () => {
    let carSelection = document.getElementById("carSelection")
    let selectedCar = cars[carSelection.value]; // A bit complex, but I did not find any better solution
    selectedCar.brake();
    console.log(selectedCar.speed);
}






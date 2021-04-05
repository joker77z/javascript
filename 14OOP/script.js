'use strict';

// 209. 코딩 과제 # 1
// const Car = function(make, speed) {
//     this.make = make;
//     this.speed = speed;
// }

// Car.prototype.accelerate = function() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`)
// }

// Car.prototype.break = function() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`)
// }

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate(); // 130
// bmw.accelerate(); // 140
// bmw.accelerate(); // 150

// 214. 코딩 과제 # 2 (209 개선)
// 내가 한거
// class CalCl {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   get speedUS() {
//     return `${this.speed / 1.6}mi/h`
//   }

//   set speedUS(speed) {
//     console.log(`${speed * 1.6}km/h`)
//   }

//   accelerate() {
//     this.speed += 10
//     console.log(`${this.make} is going at ${this.speed} km/h`)
//   }

//   break() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`)
//   }
// }

// const Ford = new CalCl('Ford', 120)
// console.log(Ford.speedUS) // 75mi/h
// Ford.speedUS = 75 // 120km/h
// Ford.accelerate()
// Ford.accelerate()

// 강의에서
class CalCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed * 1.6;
  }

  accelerate() {
    this.speed += 10
    console.log(`${this.make} is going at ${this.speed} km/h`)
  }

  break() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`)
  }
}

// const Ford = new CalCl('Ford', 120)
// console.log(Ford.speedUS) // 75
// Ford.speedUS = 75 
// console.log(Ford) // CalCl {make: "Ford", speed: 120}
// Ford.accelerate()
// Ford.accelerate()

// const EV = function(make, speed, charge) {
//     Car.call(this, make, speed);
//     this.charge = charge;
// }

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.accelerate = function() {
//     this.speed += 20;
//     this.charge -= 1;
//     console.log(`${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}%`);
// }

// EV.prototype.chargeBattery = function(chargeTo) {
//     this.charge = chargeTo;
// }

// const Tesla = new EV('Tesla', 120, 23);
// Tesla.accelerate();
// Tesla.break();
// Tesla.chargeBattery(90);
// Tesla.accelerate();

// 224. FINAL TEST(Coding Challenge #4)

// 내가 스스로 성공!
class EVCl extends CalCl{
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
    }
    accelerate() {
        this.speed += 10;
        this.#charge--;
        console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`)
        return this;
    }
    break() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`)
        return this;
    }
}

const Rivian = new EVCl('Rivian', 120, 23);
// console.log(Rivian.#charge);
Rivian.accelerate().accelerate().break().break();
Rivian.chargeBattery(200);

console.log(Rivian.speedUS)
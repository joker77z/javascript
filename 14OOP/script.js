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

const Ford = new CalCl('Ford', 120)
console.log(Ford.speedUS) // 75
Ford.speedUS = 75 // CalCl {make: "Ford", speed: 120}
console.log(Ford)
Ford.accelerate()
Ford.accelerate()
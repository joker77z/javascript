"use strict";

// 209. 코딩 과제 # 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  // const fastSpeed = this.speed + 10;
  // console.log(fastSpeed)
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.break = function () {
  // const slowSpeed = this.speed - 5;
  // console.log(slowSpeed);
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate(); // 130
bmw.accelerate(); // 140
bmw.accelerate(); // 150

"use strict";

// 205. 생성자 함수와 새로운 연산자 --------------------------------

// #1
const Person = function (firstName, birthYear) {
  // Instance Property
  this.firstName = firstName;
  this.birthYear = birthYear;
};
const jonas = new Person("Jonas", "1991");
console.log(jonas); // Person {firstName: "Jonas", birthYear: "1991"}

// #2 더 많은 개체를 만들어보자. 위 생성자 함수를 기반으로 하는 객체들.
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

// #3 Person의 인스턴스인지 확인할 수 있는 방법
console.log(jonas instanceof Person); // true

// 206. Prototypes -----------------------------------
// 자바스크립트의 모든 함수에는 자동으로 prototype라는 속성이 있다.
// 생성자 함수 역시 마찬가지다.

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

jonas.calcAge(); // 30
// 신기한건 웹브라우저 콘솔창에 jonas를 치면 calcage 메소드는 포함되어 있지 않다! 하지만 사용할 수 있다. 그런데, jonas.__proto__를 하면 볼 수 있다.

console.log(Person.prototype);
/*
  {constructor: ƒ}
  calcAge: ƒ ()
  constructor: ƒ (firstName, birthYear)
  __proto__: Object
*/
console.log(jonas.__proto__);
/*
  {calcAge: ƒ, constructor: ƒ}
  calcAge: ƒ ()
  constructor: ƒ (firstName, birthYear)
  __proto__: Object
*/
console.log(jonas);
/*
  Person {firstName: "Jonas", birthYear: "1991"}
  birthYear: "1991"
  firstName: "Jonas"
  __proto__: Object
*/
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true : Person.prototype은 jonas의 프로토타입이다.
console.log(jonas.isPrototypeOf(Person.prototype)); // false
console.log(Person.prototype.isPrototypeOf(Person)); // false : 즉, Person.prototype은 Person의 원형을 얘기하는게 아니다. 어떤 Person과 링크된 객체라고 보는게 맞다. 네이밍의 오류다.

Person.prototype.species = "Homo Sapiens";
console.log(jonas.species, matilda.species); // Homo Sapiens
console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false
// false가 나오는 이유는 jonas 객체의 내부에 있는 것이 아니라 prototype에 있는 속성에 단순히 액세스 할 수 있는 것.
console.log(jonas);
/*
Person {firstName: "Jonas", birthYear: "1991"}
  birthYear: "1991"
  firstName: "Jonas"
  __proto__:
      calcAge: ƒ ()
      species: "Homo Sapiens"
      constructor: ƒ (firstName, birthYear)
      __proto__: Object
*/

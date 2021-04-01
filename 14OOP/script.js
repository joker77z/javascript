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

// 208. 내장 객체에 대한 프로토 타입 상속 (207강 프로토 타입 체인 코드로.)---------------------------------------------------------
console.log(jonas.__proto__); // Person의 prototype = Person.prototype
console.log(jonas.__proto__.__proto__); // Object의 프로토 타입 = Object.prototype
/*
  {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
    constructor: ƒ Object() // 여기서 보면 Object가 생성자인 것을 볼 수 있다.
    hasOwnProperty: ƒ hasOwnProperty()
    isPrototypeOf: ƒ isPrototypeOf()
    propertyIsEnumerable: ƒ propertyIsEnumerable()
    toLocaleString: ƒ toLocaleString()
    toString: ƒ toString()
    valueOf: ƒ valueOf()
    __defineGetter__: ƒ __defineGetter__()
    __defineSetter__: ƒ __defineSetter__()
    __lookupGetter__: ƒ __lookupGetter__()
    __lookupSetter__: ƒ __lookupSetter__()
    get __proto__: ƒ __proto__()
    set __proto__: ƒ __proto__()
*/
console.log(jonas.__proto__.__proto__.__proto__); // Object.prototype의 __proto__는 또 위로 올라가야하는데 없기 때문에 null이다.
console.log(Person.prototype.constructor); // Person의 prototype으로 왔다가 다시 생성자인 Person으로 돌아간다.
/*
  ƒ (firstName, birthYear) {
    // Instance Property
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
*/
// 제대로 보기 위해서는 console.dir을 사용해야 한다.
console.dir(Person.prototype.constructor);
/*
  ƒ Person(firstName, birthYear)
    arguments: (...)
    caller: (...)
    length: 2
    name: "Person"
    prototype: {species: "Homo Sapiens", calcAge: ƒ, constructor: ƒ}
    __proto__: ƒ ()
    [[FunctionLocation]]: script.js:6
    [[Scopes]]: Scopes[2]
*/

const arr = [3, 6, 4, 5, 6, 9, 3]; // new Array === []
console.log(arr.__proto__); // constructor(생성자)가 Array다.
console.log(arr.__proto__ === Array.prototype); // 배열을 만들면 Array 생성자에 의해 만들어지는 것을 알 수 있다.
console.log(arr.__proto__.__proto__); // constructor(생성자)가 Object다.

// 중복제거 기능.
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// 이렇게 하면 이제 모든 배열이 해당 메소드를 상속받아서 호출할 수 있다.
console.log(arr.unique());

// 그런데 이건 안좋은 습관이다!
// Array 자체 메소드로 unique가 다음 자바스크립트 버전에서 추가될 수 있다.

const h1 = document.querySelector("h1");
console.log(h1);
console.dir(h1); // 맨 밑으로 내려보면 HTMLHeadingElement.
// 맨 밑의 __proto__를 클릭해서 또 들어가면 HTMLElement
// 또 다음은 Element 또 다음은 Node 또 다음은 EventTarget 또 다음은 Object.
// 전 강의? 전전강의에 다이어그램 캡쳐해놓은 것을 확인해 볼 수 있다.

console.dir((x) => x + 1); // __proto__로 들어가보면 apply, bind, 이런게 있음을 알 수 있다. 그리고 제일 밑 __proto__를 보면 Object라는 것을 알 수 있다. 즉, 함수 자체도 객체다.

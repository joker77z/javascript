"use strict";

// 205. 생성자 함수와 새로운 연산자
// 생성자 함수의 첫 글자는 대문자 규칙이 있다.
// this키워드가 없기 때문에 함수 사용할 때 화살표 함수는 없다.

// #1 Person 타입으로 빈 객체가 생성된다.
// const Person = function (firstName, birthYear) {
//   console.log(this); // Person {}
// };

// //생성자 함수는 new를 통해 호출한다.
// new Person("Jonas", "1991");

// #2
const Person = function (firstName, birthYear) {
  // Instance Property
  this.firstName = firstName;
  this.birthYear = birthYear;

  // #5 메소드 생성하기
  // 절대. 이렇게. 하면. 안된다. 생성자 함수 내부에.
  // 왜냐면 수백, 수천개의 사람 개체를 만들었다고 가정하면 모든 개체가 이 기능을 수행하려고 할 것이기 때문. 만약 100개의 메소드를 만들고 100개의 사람 개체가 있다고 하면 10000개의 메소드를 사용하는 격이 된다.
  // 성능을 위해 이렇게 하면 안된다.
  // > 이것을 해결하기 위해 프로토 타입, 포로토 타입 상속을 사용할 것이다.
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
};
//생성자 함수는 new를 통해 호출한다.
const jonas = new Person("Jonas", "1991");
console.log(jonas); // Person {firstName: "Jonas", birthYear: "1991"}
// Person 객체가 나오고 속성과 값이 나온다.

// #순서
// 1. 생성자 함수를 만들고
// 2. 생성자 함수를 호출하기 위해 new 키워드 or new 연산자를 사용하고
// 3. 새로운 빈 객체가 생성된다. this = {}
// 4. this.firstName = firstName 처럼 값을 부여해주고
// 5. 자동 return 된다.

// #3 더 많은 개체를 만들어보자. 위 생성자 함수를 기반으로 하는 객체들.
const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

// #설명
// - 위 생성자 함수는 초반 강의에서 설명했듯 청사진이다.
// 이 청사진을 이용해서 다양한 객체를 만들어낼 수 있다.
// - 고전적인 객체 지향 프로그래밍에서는 클래스에서 생성된 객체를 '인스턴스'라고 부른다.
// 그러나 javascript에는 클래스가 없다.
// 하지만 여기서 Person이 가상의 class라고 할 수 있는 것이고 나머지 jonas, matilda, jack이 인스턴스라고 할 수 있는 것이다.

// #4 Person의 인스턴스인지 확인할 수 있는 방법
console.log(jonas instanceof Person); // true

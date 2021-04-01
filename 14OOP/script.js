// 210. ES6
// javascript에서도 class를 사용할 수 있다.

// class expression
// const PersonCl = class {

// }

// class declaration
// 선생님은 이것을 더 선호하기 때문에 이것을 사용.
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`hey ${this.firstName}`);
  }
}
const taejoon = new PersonCl('taejoon', 1993);
taejoon.calcAge();

console.log(taejoon.__proto__ === PersonCl.prototype) // true

// 메소드 추가
// PersonCl.prototype.greet = function() {
//   console.log(`hey ${this.firstName}`);
// }

taejoon.greet();

// 1. 클래스는 호이스팅되지 않는다. 즉, 다른 선언같이 밑에 있어도 되는 것과 달리 클래스는 위에 있어야 한다.
// 2. 클래스는 함수로 반환하고 함수에서 반환한다. first-class citizens 이다.
// 3. 클래스는 항상 스트릭트 모드에서 실행된다.

// - 생성자 함수를 쓰지 않고 클래스를 써야 하냐? 아니다. 생성자 함수를 계속 써도 된다.
// - 프로토 타입을 이해하지 못했다면 클래스를 사용하면 안된다.
// - 선생님의 경우 생성자 함수는 지저분해 보이고. class사용이 너무 좋아 보인다. 그러나 개인적인 생각이다. 각자의 판단에 맡긴다.
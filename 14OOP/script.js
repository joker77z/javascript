// 210. ES6
// javascript에서도 class를 사용할 수 있다.

// class expression
// const PersonCl = class {

// }

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`hey ${this.firstName}`);
  }

  get age() {
    return 2021 - this.birthYear;
  }

  // this.fullName은 이미 존재하기 때문에 관습적으로 _fullName 이런식으로 한다. 자바스크립트 특별한 기능이 아닌 네이밍을 다르게 하는 것.
  // fullName 인자 값으로 들어온 값이 this.fullName으로 가고 set fullName을 통해서 받은 name값을 this._fullName에다가 name값을 받는다.
  set fullName(name) {
    console.log(name); // taejoon park
    if(name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`)
  }

  get fullName() { // console창에서 이름.fullName 을 쳐도 나오게 혹은 이런 특성을 이용하게
    return this._fullName;
  }
}

const taejoon = new PersonCl('taejoon park', 1993);
taejoon.calcAge();
console.log(taejoon.age); // console창에 taejoon쳐보면 age를 가지고 있는 것이 보인다. 즉, 게터 age()가 메소드가 아닌 속성처럼 보인다.
// console.log(taejoon.__proto__ === PersonCl.prototype) // true

// 메소드 추가
// PersonCl.prototype.greet = function() {
//   console.log(`hey ${this.firstName}`);
// }
taejoon.greet();

// 새롭게 다시 시도해보자.
const walter = new PersonCl('walter we', 1965)

// 211. 게터 세터
// javascript의 모든 객체는 setter, getter를 가질 수 있다. 이러한 속성을 assessor properties라고 한다.

const account = {
  owner : 'Jonas',
  movements : [200, 530, 120, 300],

  //세터, 게터 두개 다 반드시 사용할 필요는 없다.
  get latest() { // 게터 (얻다)
    return this.movements.slice(-1).pop();
  },

  set latest(mov) { // 세터 (새로운 값 세팅) : 모든 세터 메소드에는 하나 이상 매개 변수가 반드시 있어야 한다.
    this.movements.push(mov);
  }
  
};
// 게터 : 새로운 값으로 얻었다.
console.log(account.latest); // 뒤에 괄호() 붙이는거 아니다.
// 세터 (메소드처럼 괄호 안에 값을 넣는 것이 아니라 속성 같다.)
// account.latest(50);
account.latest = 50;
console.log(account.movements);

// 위에 예제에 대입을 해보자.

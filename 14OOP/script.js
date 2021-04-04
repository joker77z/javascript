'use strict';

class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
  
    // 인스턴스 메소드
    // .prototype 속성에 모두 포함 된다.
    calcAge() {
      console.log(2021 - this.birthYear);
    }
  
    greet() {
      console.log(`hey ${this.firstName}`);
    }
  
    get age() {
      return 2021 - this.birthYear;
    }
  
    // 유효성 검사 : 새로운 개체를 만들 때 유효성 검사를 할 때 유용하다. 그것이 세터가 하는 일.
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
  
    // 스태틱(정적)메소드
    // .prototype속성에 포함되지 않는다.
    static hey() {
      console.log('hey there');
      console.log(this);
    }
  }

  // 217. "클래스"간의 상속 : ES6 클래스
  // 추가 속성이 필요 없으면 그냥 extends PersonCl 여기까지만 해도 데이터를 가져온다.
//   class StudentCl extends PersonCl{
    //       constructor(fullName, birthYear, course) {
    //           // Always needs to happen first
    //         super(fullName, birthYear)
    //       }
    //   }
    // const martha = new StudentCl('Martha Jones', 2012);

  class StudentCl extends PersonCl{ // 생성자 함수를 사용할때는 메소드를 가져오기 위해서 자식.prototype = Object.create(부모.prototype)
      constructor(fullName, birthYear, course) {
        // Always needs to happen first
        super(fullName, birthYear) // 생성자 함수를 사용할 때는 생성자함수명.call(this, 인수1, 인수2)
        this.course = course;
      }

      introduce() {
          console.log(`My name is ${this.fullName} and I study ${this.course}`);
      }

      // calcAge 재정의
      calcAge() {
          console.log(`I'm ${2037 - this.birthYear} years old, but as a student i feel more like ${2037 - this.birthYear + 10}`)
      }
  }
  const martha = new StudentCl('Martha Jones', 2012, 'computer science')
  console.log(martha)
  martha.introduce();
  martha.calcAge();
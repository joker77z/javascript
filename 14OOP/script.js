'use strict';
// 215. "클래스"간의 상속 : 생성자 함수
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function() {
    console.log(2037 - this.birthYear);
}

const Student = function(firstName, birthYear, course) {
    // this.firstName = firstName;
    // this.birthYear = birthYear;
    Person.call(this, firstName, birthYear);
    this.course = course;
}

// 연결! Person의 메소드를 할당받기 위해서 Person의 프로토타입과 Student 프로토 타입을 연결.
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function() {
    console.log(`My name is ${this.firstName} and i study ${this.course}`)
}

const mike = new Student('mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

// Student 와 Person을 연결했기 때문에 true가 나온다.
console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true

Student.prototype.constructor = Student; // 그래서 이렇게 지정했다.
console.dir(Student.prototype.constructor) // Person이 나오면 안된다. 고쳐야 한다. ↑
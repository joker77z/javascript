'use strict';

  
// 213. Object.create -------------------------------------------
const PersonProto = {
calcAge() {
    console.log(2021 - this.birthYear);
},

init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}
}
const steven = Object.create(PersonProto);

// 218. "클래스"간의 상속 : Object.create
const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and i study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'computer science');
jay.introduce();
jay.calcAge();
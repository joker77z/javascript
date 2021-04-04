'use strict';

// 219. 다른 클래스 예제
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    deposit(val) {
        this.movements.push(val);
    }

    withdrawl(val) {
        return this.deposit(-val);
    }

    approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if(this.approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111)
// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdrawl(140);
acc1.requestLoan(1000);
acc1.approveLoan(1000); // 아무 일도 일어나지 않지만 현실에서는 이렇게 접근할 수가 없어야 한다.
console.log(acc1);
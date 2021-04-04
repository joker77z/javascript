'use strict';

// 219. 다른 클래스 예제
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        
        //protected property _를 붙이면 보안이 생기는 것은 아니지만 관례적으로 보안요소는 이렇게 설정한다.
        this._pin = pin;
        this._movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    // 직접 접근을 제한하고 movements를 옳바르게 얻는 방법이다.
    // 접근은 할 수 있지만 override를 할 수는 없다. 즉, 수정할 수는 없다.
    // _를 쓰지 않는 한은 말이다.
    // 하지만 개발자들은 movements에 _를 붙였기 때문에 직접 접근하는 것이 잘못됐다는 것을 알 것이다.
    // getter나 setter 대신 이렇게도 쓴다
    getMovements() {
        return this._movements;
    }

    deposit(val) {
        this._movements.push(val);
    }

    withdrawl(val) {
        return this.deposit(-val);
    }

    // 은행 내부적으로 승인을 결정하는 것이기 때문에 이것도 보호한다.
    _approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if(this._approveLoan(val)) {
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
acc1._approveLoan(1000); // 아무 일도 일어나지 않지만 현실에서는 이렇게 접근할 수가 없어야 한다.
console.log(acc1);

// 220. 캡슐화 : 보호 된 속성 및 방법
// 캡슐화는 기본적으로 클래스 내 일부 속성& 메소드를 비공개로 유지해서 클래스 외부에서 액세스 할 수 없도록 하는 것이다.
console.log(acc1.getMovements());

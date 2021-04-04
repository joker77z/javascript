'use strict';

// 219. 다른 클래스 예제
// 221. 캡슐화 : 개인 클래스 필드 및 메서드
// 영상 촬영당시 크롬에서만 적용이 되는 중이였고 계속 조금씩 바뀔 수 있는 부분이다.
/*
    기본적으로 OOP에서 아래와 같이 부른다. 8종류 중에 4종류만 알아보겠다.
    1. public fields
    2. private fields
    3. public methods
    4. private methods
    나머지 4개는 static 관련 된 것.
    그 중에서 static method만 아래 코드로 작성해보고 나머지 3개는 덜 중요해서 궁금하면 스스로 찾아보자.
*/
class Account {
    // 1. public fields (instance) : const나 let이 필요하지 않고 마치 변수를 선언하는 듯 보인다. 모든 인스턴스에서 확인할 수 있다.
    // 인수에 없는 두 가지를 public fields라고 할 수 있다.
    // 이렇게 하고 account를 콘솔창에서 봐도 이전과 똑같은 것을 확인 가능하다.
    // 밑에 주석 처리한 두 줄과 동일하다.
    locale = navigator.language;
    // _movements = [];
    
    // 2. private fields (instance)
    // 이제 movements를 가져오겠다. 언더바를 제거하고
    #movements = [];
    // 이제 pin을 가져오는데 pin은 생성자안에 있다. 그것을 필드로 꺼내와야 한다.
    // 이럴 때는 마치 정의하는 것처럼 #과 인수명만 쓰면 끝이다.
    #pin;

    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        
        //protected property _를 붙이면 보안이 생기는 것은 아니지만 관례적으로 보안요소는 이렇게 설정한다.
        // this._pin = pin;
        this.#pin = pin; // 그리고 여기에서 다시 재정의한다.
        // this._movements = [];
        // this.locale = navigator.language;

        console.log(`Thanks for opening an account, ${owner}`);
    }

    // 직접 접근을 제한하고 movements를 옳바르게 얻는 방법이다.
    // 접근은 할 수 있지만 override를 할 수는 없다. 즉, 수정할 수는 없다.
    // _를 쓰지 않는 한은 말이다.
    // 하지만 개발자들은 movements에 _를 붙였기 때문에 직접 접근하는 것이 잘못됐다는 것을 알 것이다.
    // getter나 setter 대신 이렇게도 쓴다
    // 3. public methods // 퍼블릭 메소드 자체가 아래 작성한 방법과 동일해서 더이상 할 것이 없다.
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
    }

    withdrawl(val) {
        return this.deposit(-val);
    }

    // 은행 내부적으로 승인을 결정하는 것이기 때문에 이것도 보호한다.
    // _approveLoan(val) {
    //     return true;
    // }

    requestLoan(val) {
        if(this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
    }

    static helper() { // 보통 도우미 기능에 사용한다. 왜냐면 이런 static 메소드는 모든인스턴스에서 사용이 불가능하기 때문에. 하지만 클래스 자체에서만 사용가능하다.
        console.log('Helper');
    }

    // 4. private methods 
    // 인스턴스에 있으면 안되고 메소드안에 프로텍트화 되어있어야 하는데 아직 크롬도 지원하지 않아서 원래대로 돌아가겠다.
    // 나중에 언젠간 사용 가능해질 것이다.

    // #approveLoan(val) {
    //     return true;
    // }
    _approveLoan(val) {
        return true;
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111)
// acc1.movements.push(250);
// acc1.movements.push(-140);
acc1.deposit(250);
acc1.withdrawl(140);
acc1.requestLoan(1000);
// acc1.#approveLoan(1000); // 아무 일도 일어나지 않지만 현실에서는 이렇게 접근할 수가 없어야 한다.
console.log(acc1);

// 220. 캡슐화 : 보호 된 속성 및 방법
// 캡슐화는 기본적으로 클래스 내 일부 속성& 메소드를 비공개로 유지해서 클래스 외부에서 액세스 할 수 없도록 하는 것이다.
console.log(acc1.getMovements());

// 221. 캡슐화
// private fields로 보호한 movements를 읽어보려고 하면 에러발생한다.
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(1000));
Account.helper()
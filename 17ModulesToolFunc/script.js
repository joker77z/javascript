// #1 모듈별로 하나씩 가져오기

// html파일에 script를 불러오는 부분에 type="module"을 추가한다.
// strict mode를 쓰지 않는 이유는 모듈은 자동으로 적용된다.

/* importing module */
// import { addToProduct, totalPrice as price, tq } from "./shoppingCart.js"; // 확장자 없이도 작동한다. 항상 먼저 실행이다. 호이스팅 된다.
console.log("importing module");
// console.log(shoppingCost); // 모듈안에 있는 변수는 private이라 호출안된다.
// addToProduct("bread", 5);
// console.log(price, tq);

// #2 모든 모듈을 한번에 가져오기
// import * as ShoppingCart from "./shoppingCart.js";
// ShoppingCart.addToProduct("bread", 5);

// #3 default 모듈 가져오기
// 모듈안에 한개의 기능만 사용할 때는 아래와 같은 방법이 좋다.
import add, {cart} from './shoppingCart.js';
add('pizza', 5);
console.log(cart); // 배열이 나온다.
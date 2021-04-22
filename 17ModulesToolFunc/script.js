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

// #4 script.js 내부에서 모듈처럼 사용하는 모듈 만들기.
// 이런걸 클로저라고 한다. ES6 이전에는 이렇게 사용했다.
// 여러가지 제한이 있어서 ES6에 네이티브 모듈이 추가됐다.
const ShoppingCart2 = (function() {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToProduct = function(product, quantity) {
        cart.push({product, quantity});
        console.log(`${product} ${quantity} added to cart`);
    }

    const orderStock = function(product, quantity) {
        cart.push({product, quantity})
        console.log(`${product} ${quantity} ordered from supplier`);
    }

    return {
        addToProduct,
        cart,
        totalPrice,
        totalQuantity,
    }
})();

ShoppingCart2.addToProduct('apple', 4);
console.log(ShoppingCart2);

/* 270. CommonJS 모듈 */
// ES6 이전에는 이렇게 작성해왔다. 하지만 ES6 이후에도 이 방법은 알아야 한다. Node.js때문이라도.
// node.js에서 작동한다. 아래코드는 그냥 보기만하자. 브라우저에서 안된다.
// node.js에서 export와 import는 이렇게 한다.
// export
// export.addToCart = function (product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${product} ${quantity} added to cart`);
// }

// // import
// const {addToCart} = require('./shoppingCart.js');
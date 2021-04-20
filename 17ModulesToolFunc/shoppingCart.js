console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

export const addToProduct = function(product, quantity) {
    cart.push({product, quantity})
    console.log(`${product} ${quantity} added to cart`);
}

const totalPrice = 237;
const totalQuantity = 23;

export {totalPrice, totalQuantity as tq}

// 이름 함수 내보내기가 아닌 default 내보내기 방법
export default function (product, quantity) {
    cart.push({product, quantity})
    console.log(`${product} ${quantity} added to cart`);
}
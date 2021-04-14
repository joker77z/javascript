'use strict';

// console.log('test start');
// setTimeout(() => console.log('0 sec timer'), 0)
// Promise.resolve('Resolved promise 1').then(res => console.log(res))
// Promise.resolve('Resolved promise 2').then(res => {
//     for (let i = 0; i< 1000000000; i++) {}
//     console.log(res);
// })
// console.log('test end');
/* #1
    // 콜백 외에서 실행 됐기 때문에 아래 2가지는 최우선 순위.
    test start
    test end
    // 마이크로 테스크 큐 : 콜백 큐보다 우선순위를 가진다.
    Resolved promise 1
    // 콜백 큐.
    0 sec timer
*/

console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('test end');
/* #2 
    test start
    test end
    Resolved promise 1
    // promise2가 나오기까지 많은 시간이 걸린다. 그때동안 0sec timer도 나오지 않는다.
    Resolved promise 2
    0 sec timer
*/

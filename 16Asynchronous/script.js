'use strict';

// promise를 소비하는 것에 대해서는 배웠지만 promise 자체를 만든 적은 없다.
// Promise안에 인자는 실행함수(실행자)라고 한다.
// 실행함수는 2개의 인자를 갖는다.
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lotter draw is happening');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      // 복권에 당첨됬다.  fullfilled promise. then 메소드로 값을 전달할 수 있다.
      resolve('you win');
    } else {
      // 에러메시지로 전달한다. catch로.
      reject(new Error('you lost your money'));
    }
  }, 2000);
});
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

/* Promisifying setTimeout */
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(1)
  .then(() => {
    console.log('I waited for 1seconds');
    return wait(1);
  })
  .then(() => {
    console.log('i waited for 2 second');
    return wait(1);
  })
  .then(() => {
    console.log('i waited for 3 second');
    return wait(1);
  })
  .then(() => {
    console.log('i waited for 4 second');
    return wait(1);
  });

// 정적으로 promise를 생성.
Promise.resolve('abc').then(x => console.log(x));
// Promise.reject('abc').then(x => console.error(x));
Promise.reject(new Error('abc')).then(x => console.error(x));

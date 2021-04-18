'use strict';

// 258. Async / Await로 Promise 사용
// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   const html = `
//     <article class="country ${className}">
//             <img class="country__img" src="${data.flag}" />
//             <div class="country__data">
//               <h3 class="country__name">${data.name}</h3>
//               <h4 class="country__region">${data.region}</h4>
//               <p class="country__row"><span>👫</span>${(
//                 data.population / 1000000
//               ).toFixed(1)}</p>
//               <p class="country__row"><span>🗣️ </span>${
//                 data.languages[0].name
//               }</p>
//               <p class="country__row"><span>💰</span>${
//                 data.currencies[0].code
//               }</p>
//             </div>
//           </article>
//           `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;

//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('problem getting location data');
//     const dataGeo = await resGeo.json();
//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.state}`
//     );
//     if (!res.ok) throw new Error('problem getting country data');
//     const data = await res.json();
//     renderCountry(data[0]);

//     return `you are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     // async / await을 쓸때는 try, catch를 활용해서 이렇게 만든다.
//     console.error(`${err}`);
//     renderError(` ${err.message}`);

//     throw err; // rethrow
//   }
// };
// console.log('1: will get location');
// const city = whereAmI();
// console.log(city); // return값이 반환되지 않고 Promise가 반환된다. javascript는 아직 알 방법이 없다.

/*
whereAmI()
  .then(city => console.log(`2 : ${city}`)) // undefined
  .catch(err => console.error(`2 : ${err.message}`)) // catch를 써도 undefined 나온다.
  .finally(() => console.log('3: will get location!!'));
// console.log('3: will get location!!'); // 세번째에 실행하기
*/

// async/await로 내가 직접짜보기
// const whereAmI2 = async function () {
//   try {
//     const where = await whereAmI();
//     console.log(where);
//   } catch (err) {
//     console.error(`2 : ${err.message}`);
//   } finally {
//     console.log('3: will get location!!');
//   }
// };
// whereAmI2();

//강좌
// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2:${city}`);
//   } catch (err) {
//     console.log(`${err.message}`);
//   } // finally안써도 되는듯하다.
//   console.log('3: will get location!!');
// })();

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ( ${response.status})`);

    return response.json();
  });
};

// // 세 나라 데이터를 순서에 상관없이 받기.
// const get3Countries = async function (c1, c2, c3) {
//   try {
// const [data1] = await getJSON(
//   `https://restcountries.eu/rest/v2/name/${c1}`
// );
// const [data2] = await getJSON(
//   `https://restcountries.eu/rest/v2/name/${c2}`
// );
// const [data3] = await getJSON(
//   `https://restcountries.eu/rest/v2/name/${c3}`
// );
// 모든 배열이 동시에 실행되게 해준다.
// 데이터를 동시에 가져와야 하는 경우에 병행으로 항상 가져와야 한다. 그럴 떄마다 Promise.all을 사용하자.
//하나씩 가져오는 시간보다 한번에 가져오는 시간이 훨씬 짧아 사용자를 위한 방법이다.
// combine multiple promises
//     const data = await Promise.all([
//       getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);
//     console.log(data);
//     console.log(data.map(data => data[0].capital));
//     // console.log(data1.capital, data2.capital, data3.capital);
//   } catch (err) {
//     console.log(err);
//   }
// };
// get3Countries('portugal', 'canada', 'kor');

// 다른 3가지 promise 결합자를 알아본다
// race, allSettled, any

// promise race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     // 이름이 잘못된 것이 들어가있어도 가장 빨리 나온 것이 오류가 없다면 그대로 출력된다. 즉, reject와 무관하게 실행된다.
//     // getJSON(`https://restcountries.eu/rest/v2/name/italy22`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
//   console.log(res[0]); // 제일 빨리 도착하는 것이 나와서 italy, mexico등 다양한 나라가 나와야 하지만 내 pc에서는 계속 이탈리만 나왔따.
//   // >> 내가 여태 잘못하고 있었다. network 탭에서 disable cache를 체크하면 더이상 계속 똑같은 결과만 나오지 않는다. 시간이 제일 짧게 걸리는 순으로 나온다. 매번 다르다.
// })();

// 끝없는 promise가 지속되거나 매우 긴 running promise를 방지하기 위해 유용하다.
// 예를 들어 사용자가 인터넷 상태가 좋지 않으면 가져오기를 너무 오래 기다릴 수 있다.
// 이럴 때 타임 아웃을 만들 수 있다. 일정시간이 지나면 멈추도록.
// 다른 것과 다른 점은 recject만하고 resolve는 하지 않는다.
const timeout = function(sec) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error('request took too long'))
    }, sec * 1000)
  })
}

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  timeout(1)
]).then(res => console.log(res[0])).catch(err => console.error(err));

// Promise.allSetteled
// Promise.all과 비슷하게 결과를 배열로 반환하지만 all에서는 reject를 만났을 때 멈췄다면 이것은 멈추지 않는다.
Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('success'),
]).then(res => console.log(res));

// promise.all과 비교하기
Promise.all([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('success'),
]).then(res => console.log(res)).catch(err => console.error(err));

// #4 Promise.any
// 녹화당시에 ES2021에 발표한 것이라 아직 크롬에서 적용되지 않았었다.
Promise.any([
  Promise.resolve('success'),
  Promise.reject('ERROR'),
  Promise.resolve('success'),
]).then(res => console.log(res)).catch(err => console.error(err));
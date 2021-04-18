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

// 세 나라 데이터를 순서에 상관없이 받기.
const get3Countries = async function (c1, c2, c3) {
  try {
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
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data);
    console.log(data.map(data => data[0].capital));
    // console.log(data1.capital, data2.capital, data3.capital);
  } catch (err) {
    console.log(err);
  }
};
get3Countries('portugal', 'canada', 'kor');

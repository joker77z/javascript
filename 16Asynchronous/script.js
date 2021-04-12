'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// 244. 첫번째 ajax 호출 : xmlhttprequest

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
// const getCountryAndNeightbour = function (country) {
//   // AJAX call country1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data, data2] = JSON.parse(this.responseText);
//     // console.log(data);
//     console.log(data2);

//     // Render Country 1
//     renderCountry(data2);

//     // Get neighbour country (2개)
//     const [neighbour] = data2.borders;
//     console.log([neighbour]);

//     if (!neighbour) return; // 존재하지 않으면 return해서 오류발생안되고 진행되게.

//     // AJAX call country2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       // console.log(this.responseText);
//       const data2 = JSON.parse(this.responseText); //data2를 배열에 넣지 않아야 오류가 나오지 않는다. 이유는 코드 방식으로 불러온 api의 경우 배열의 형식이 아니다.
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };
// getCountryAndNeightbour('kor');
// ES6부터 이 콜백지옥을 해결하기 위한 방법이 있다. 다음강의에서.

// 257. ES6에서 ajax. fetch활용
// 불러오기 위한 다양한 옵션을 여기서 줄 수 있으나 단순하게 URL만 전달할거라 간단하다.
const request = fetch('https://restcountries.eu/rest/v2/name/korea');
console.log(request);
/*
  Promise {<pending>}
  __proto__: Promise
  [[PromiseState]]: "fulfilled"
  [[PromiseResult]]: Response

  Promise는 미래의 값을 위한 컨테이너, 자리표시자라고 생각하자.
  AJAX호출을 시작하면 아직은 값이 없지만 미래에 값이 있다는 것을 알고 있다.
  이 미래에 값을 처리하기 위해 promise를 사용할 수 있다.
  
  예시로 보면
  1. 로또를 샀다.
  2. 로또가 당첨되거나 당첨되지 않거나 난 일단 로또를 가지고 있다.
  3. 로또에 당첨되면 난 돈을 받는다. 이것이 promise의 원리다.

  장점은 무엇인가.
  1. 더 이상 이벤트에 의존하지 않아도 된다. 이벤트를 사용하면 예상하지 못한 결과 초래(순서)
  2. 비동기 작업 순서를 확실히 지정할 수 있다.

  Promise의 주기
  1. PENDING(뜻 : 약속 보류중) : 비동기 작업 결과 값 사용할 수 있기 전.
  이 때는 백그라운드에서 비동기가 진행중이다.
  마침내 비동기 작업이 완료되면!
  2. SETTLED(뜻 : 약속 성사되다.)
  3. 두 가지로 나뉜다. FULFILLED(성공 약속) / REJECTED(거부 약속)
  (REJECTED의 경우 사용자가 오프라인이거나 연결할 수 없는 경우에 자주 발생한다.)

  이걸 또 복권으로 예시들면
  1. 복권을 샀다 = PENDING
  2. 복권이 추첨되기까지 기다린다 = 비동기 작업
  3. 복권 추첨 = SETTLED
  4. 복권 잘찍었으면 = FULFILLED / 실패했으면 REJECTED

  성취되거나 실패하거나 둘 중 한번만 가능하다. 상태변경이 안된다.
*/

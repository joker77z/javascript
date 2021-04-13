'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// 244. 첫번째 ajax 호출 : xmlhttprequest

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️ </span>${
                data.languages[0].name
              }</p>
              <p class="country__row"><span>💰</span>${
                data.currencies[0].code
              }</p>
            </div>
          </article>
          `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

/* 혹시 모르니 백업 and 학습용 */
// const getCountryData = function (country) {
//   //country1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response); // ok: false, status : 404
//       if (!response.ok) {
//         throw new Error(`Country not found ${response.status}`);
//         // throw가 들어가면 return 처럼 즉시 기능을 종료하고 반환한다.
//         // 즉시 이 then 메소드는 리젝티드 프라미스가 될 것이다.
//         // 그리고 마지막에 있는 catch로 바로 전파될 것이다.
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[1]);
//       // const neighbour = data[1].borders[0];
//       const neighbour = 'dfwfewf';

//       if (!neighbour) return;
//       // country2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`neighbour not found ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}!`);
//       renderError(`something wrong : ${err.message}`); // err에 message만.
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  //country1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // console.log(neighbour); // 호주 이웃없다. undefined. catch핸들러에 걸린다.
      // const neighbour = 'dfwfewf';

      if (!neighbour) throw new Error('No neighbour found!');
      // country2
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}!`);
      renderError(`something wrong : ${err.message}`); // err에 message만.
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function () {
  getCountryData('korea');
});

// getCountryData('koreaaaaa'); // 오류를 일부러 발생시켜서 오류 페이지를 예방하는 방법 좋다.
// 기억하자. 오류를 대비하기 위해 catch를 쓰고 필요 시 finally를 사용하는 것.
// 이번엔 두번째 then에서 이웃 관련 오류를 만들어본다.
// getJSON을 만들어서 리펙토링 한다.
// 이웃나라가 없는 오스트렐리아의 경우를 만든다.
getCountryData('australia');

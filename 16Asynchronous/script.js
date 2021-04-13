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

// 247. ES6에서 ajax. fetch활용
// 불러오기 위한 다양한 옵션을 여기서 줄 수 있으나 단순하게 URL만 전달할거라 간단하다.
// const request = fetch('https://restcountries.eu/rest/v2/name/korea');
// console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) // 1. promise를 반환하는 함수사용
//     .then(function (response) {
//       // 2. then메소드로 promise를 처리.
//       console.log(response); // Type이 Response로 나온다.
//       return response.json(); // 3. 실제로 response객체로 나오는 것을 읽으려면 json메소드를 사용해야 한다. return을 사용하면서 데이터 그 자체로 나온다.
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[1]);
//     });
// };
// getCountryData('korea');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  //country1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(
      response => response.json()
      // err => alert(err) // 첫번째 방법. 여기서 오류를 캐치해서 console에 uncaught오류 발생이 x
    )
    .then(data => {
      renderCountry(data[1]);
      const neighbour = data[1].borders[0];

      if (!neighbour) return;
      // country2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(
      response => response.json()
      // arr => alert(arr) // 이 fetch를 가져올 때에 대한 arr 대응도 해준다.
    )
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}!`); // 두번째. 더 좋은 방법. 오류는 기본적으로 잡힐 때 까지 쭉 밑으로 내려간다.
      // 그리고 어디에도 잡히지 않을 경우 Uncaught 오류가 발생한다.
      renderError(`something wrong : ${err.message}`); // err에 message만.
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    }); // 풀필드나 리젝트 되더라도 항상 실행된다.
  // 정리하면 풀필드일때는 then이 실행을.
  // 리젝트 될 때는 catch 실행을.
  // finally 는 항상. 매번 쓰이지는 않는다. 데이터를 로드할 때 작업이 완료되기 전에 보여주는 돌아가는 원 만들때 쓴다.
  // opacity 1로 만드는 것을 여기다가 쓰자.
};
// 250. 거부 된 약속 처리
btn.addEventListener('click', function () {
  getCountryData('korea');
});

getCountryData('koreaa'); // 이것을 입력했을 때 이 이름을 가진 국가를 찾을 수 없습니다. 라는 문구가 나오도록 다음강의에서 연습.

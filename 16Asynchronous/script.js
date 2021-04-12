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
  countriesContainer.style.opacity = 1;
};
const getCountryAndNeightbour = function (country) {
  // AJAX call country1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    const [data, data2] = JSON.parse(this.responseText);
    // console.log(data);
    console.log(data2);

    // Render Country 1
    renderCountry(data2);

    // Get neighbour country (2개)
    const [neighbour] = data2.borders;
    console.log([neighbour]);

    if (!neighbour) return; // 존재하지 않으면 return해서 오류발생안되고 진행되게.

    // AJAX call country2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener('load', function () {
      // console.log(this.responseText);
      const data2 = JSON.parse(this.responseText); //data2를 배열에 넣지 않아야 오류가 나오지 않는다. 이유는 코드 방식으로 불러온 api의 경우 배열의 형식이 아니다.
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeightbour('kor');
// ES6부터 이 콜백지옥을 해결하기 위한 방법이 있다. 다음강의에서.

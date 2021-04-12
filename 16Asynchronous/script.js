'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// 244. 첫번째 ajax 호출 : xmlhttprequest

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  // 데이터 전달 유형 선택. 여기서는 데이터를 얻는 것이니 GET.
  // 두번째 인자로 깃허브에 public api에서 사용할 주소를 넣는다.
  // ctrl+ f : rest countries 검색
  // auth는 추가로 인증이 필요한지.
  // CORS는 Cross Origin Resource Sharing.
  // 즉, CORS가 없으면 타사 API에 액세스 할 수 없다.
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();
  // console.log(request.responseText); // 아무 데이터도 나오지 않는다. 왜냐면 아직 완전히 load가 되지 않은 상태여서 그런듯 하다.
  // 요청 보낸 것이 다 load됬을 때 콜백함수 실행.
  request.addEventListener('load', function () {
    //   console.log(this.responseText); // JSON이 나타난다. 객체 형태지만 제대로 정리가 되어있지 않은 형태로 나타난다.
    //그래서 JSON.parse를 사용한다.
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
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
  });
};
getCountryData('korea');
getCountryData('usa');
getCountryData('germany');
// 이렇게 하면 가끔 순서가 바뀌어서 나온다.
// 다음 강의에 콜백지옥을 보여주겠다.

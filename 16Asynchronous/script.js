'use strict';

// 258. Async / Await로 Promise 사용
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

const whereAmI = async function() {
  try {
    const position = await getPosition();
  const {latitude : lat, longitude : lng} = position.coords;

  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  if(!resGeo.ok) throw new Error('problem getting location data')
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.state}`);
  if(!res.ok) throw new Error('problem getting country data')
  const data = await res.json();
  console.log(data);
  renderCountry(data[2]);
  }
  catch(err){
    console.error(err);
    renderError(` ${err.message}`)
  }
}
whereAmI();
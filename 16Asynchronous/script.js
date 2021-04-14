'use strict';

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
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // position => console.log(position),
    // err => console.error(err)
  });
};
getPosition().then(pos => console.log(pos.coords));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`please stop request ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.country.replace(/ /g, '')}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) throw new Error(`country not found ${response.status}`);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`some error happen : ${err.message}`));
};
btn.addEventListener('click', whereAmI);
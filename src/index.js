import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 1000;

const inputRef = document.querySelector('#search-box');
const divInfoRef = document.querySelector('.country-info');
const ulListRef = document.querySelector('.country-list');

inputRef.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

const country = inputRef.value;

function onInputType(country) {
  //   fetchCountries(country)
  //   if ((countries.length = 1)) {
  //     console.log('ОДНА');
  //     // ulListRef.innerHTML = '';
  //     // divInfoRef.innerHTML = markupCard(countries[0]);
  //   } else if (countries.length >= 2 && countries.length <= 10) {
  //     // divInfoRef.innerHTML = '';
  //     console.log('от 2 до 10');
  //   }
  //   // divInfoRef.innerHTML = markupCard(countries[0]);
  //   else {
  //     // ulListRef.innerHTML = '';
  //     // divInfoRef.innerHTML = '';
  //     console.log('БОЛЬШЕ 10');
  //   }
}

function fetchCountries() {
  fetch(`https://restcountries.com/v3.1/name/${inputRef.value}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      console.log(countries.length);

      countries.forEach(markupList);
    })
    .catch(error => console.log(error));
}

function markupCard(country) {
  return `<div class="country-label">
        <img src="${country.flags.svg}" alt="${country.name.common}" class="country-flag" />
        <h1 class="country-name">${country.name.official}</h1>
      </div>
      <p class="paragraph">Capital: <span class="value">${country.capital}</span></p>
      <p class="paragraph">Population: <span class="value">${country.population}</span></p>
      <p class="paragraph">Languages: <span class="value">${country.fifa}</span></p>
      `;
}

function markupList(country) {
  ulListRef.insertAdjacentHTML(
    'beforeend',
    `<li>
        <img
          src="${country.flags.svg}"
          alt="${country.name.common}"
          class="country-flag"
        />${country.name.official}
      </li>`
  );
}

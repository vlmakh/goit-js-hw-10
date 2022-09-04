import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const divInfoRef = document.querySelector('.country-info');
const ulListRef = document.querySelector('.country-list');

inputRef.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY));

function onInputType() {
  fetchCountries(inputRef.value)
    .then(markup)
    .catch(error => Notiflix.Notify.failure(`${error}`));
}

function markup(countries) {
  clearPage();

  console.log(countries[0]);

  if (countries.length === 1) {
    markupCard(countries[0]);
  } else if (countries.length >= 2 && countries.length <= 10) {
    countries.forEach(markupList);
  } else if (countries.length > 10) {
    clearPage();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}

function markupCard(country) {
  ulListRef.innerHTML = '';
  divInfoRef.innerHTML = `<div class="country-label">
        <img src="${country.flags.svg}" alt="${country.name.common}" class="country-flag" />
        <h1 class="country-name">${country.name.common}</h1>
      </div>
      <p class="paragraph">Capital: <span class="value">${country.capital}</span></p>
      <p class="paragraph">Population: <span class="value">${country.population}</span></p>
      <p class="paragraph">Languages: <span class="value">${country.languages}</span></p>
      `;
}

function chooseLanguages(country) {
  console.dir(country[0].languages);
}

function markupList(country) {
  divInfoRef.innerHTML = '';
  ulListRef.insertAdjacentHTML(
    'beforeend',
    `<li>
        <img
          src="${country.flags.svg}"
          alt="${country.name.common}"
          class="country-flag"
        />${country.name.common}
      </li>`
  );
}

function clearPage() {
  ulListRef.innerHTML = '';
  divInfoRef.innerHTML = '';
}

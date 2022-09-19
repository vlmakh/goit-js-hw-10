import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

Notiflix.Notify.init({
  position: 'center-center', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
});

const DEBOUNCE_DELAY = 400;

const inputRef = document.querySelector('#search-box');
const divInfoRef = document.querySelector('.country-info');
const ulListRef = document.querySelector('.country-list');

inputRef.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY));

function onInputType() {
  if (inputRef.value === '') {
    clearPage();
    return;
  } else {
    fetchCountries(inputRef.value)
      .then(markup)
      .catch(error => Notiflix.Notify.failure(`${error}`));
  }
}

function markup(countries) {
  clearPage();

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
  const languages = Object.values(country.languages);

  const { flags, name, capital, population } = country;

  divInfoRef.innerHTML = `<div class="country-label">
        <img src="${flags.svg}" alt="${name.common}" class="country-flag" />
        <h1 class="country-name">${name.common}</h1>
      </div>
      <p class="paragraph">Capital: <span class="value">${capital}</span></p>
      <p class="paragraph">Population: <span class="value">${population}</span></p>
      <p class="paragraph">Languages: <span class="value">${languages}</span></p>
      `;
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

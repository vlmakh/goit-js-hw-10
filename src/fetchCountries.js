export function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then(
    response => {
      return response.json();
    }
  );
}

// `https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,currencies`

// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

// ограничить поиск по определенным полям
// вывести языки из объекта

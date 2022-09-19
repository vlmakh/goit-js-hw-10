export function fetchCountries(searchQuery) {
  return fetch(
    `https://restcountries.com/v3.1/name/${searchQuery.trim()}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
}

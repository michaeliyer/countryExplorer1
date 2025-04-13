let x = 10;
console.log(x)

const countrySelect = document.getElementById("countrySelect");
const countryInfo = document.getElementById("countryInfo");
const countryName = document.getElementById("countryName");
const flag = document.getElementById("flag");
const capital = document.getElementById("capital");
const population = document.getElementById("population");
const region = document.getElementById("region");
const languages = document.getElementById("languages");

let allCountries = [];

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allCountries = data.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    countrySelect.innerHTML =
      '<option value="">--Select a country--</option>' +
      allCountries
        .map(
          (country) =>
            `<option value="${country.cca3}">${country.name.common}</option>`
        )
        .join("");
  });

countrySelect.addEventListener("change", (e) => {
  const selected = allCountries.find(
    (country) => country.cca3 === e.target.value
  );

  if (selected) {
    countryName.textContent = selected.name.common;
    flag.src = selected.flags.svg;
    flag.alt = `${selected.name.common} flag`;
    capital.textContent = selected.capital ? selected.capital[0] : "N/A";
    population.textContent = selected.population.toLocaleString();
    region.textContent = selected.region;
    languages.textContent = selected.languages
      ? Object.values(selected.languages).join(", ")
      : "N/A";

    countryInfo.classList.remove("hidden");
  } else {
    countryInfo.classList.add("hidden");
  }
});
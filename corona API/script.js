const input = document.getElementById("countryInput");
const resultBox = document.getElementById("result");
const btn = document.getElementById("searchBtn");

btn.addEventListener("click", fetchCovidInfo);

async function fetchCovidInfo() {
  const countryName = input.value.trim();

  if (countryName === "") {
    resultBox.innerHTML = `<p class="error">Please enter a country name</p>`;
    return;
  }

  const apiURL = `https://disease.sh/v3/covid-19/countries/${countryName}`;

  try {
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();

    resultBox.innerHTML = `
      <div class="data-box">
        <h2>${data.country}</h2>
        <div class="stats">
          <div><span>Total Cases</span><strong>${data.cases.toLocaleString()}</strong></div>
          <div><span>Deaths</span><strong>${data.deaths.toLocaleString()}</strong></div>
          <div><span>Active</span><strong>${data.active.toLocaleString()}</strong></div>
        </div>
      </div>
    `;
  } catch (err) {
    resultBox.innerHTML = `<p class="error">Country data not available</p>`;
  }
}

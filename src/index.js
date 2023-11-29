function updateWeather(response) {
  let todayTemperatureElement = document.querySelector("#today-temperature");
  let todayTemp = response.data.temperature.current;
  let city = document.querySelector("#city-name");
  let todayDescription = document.querySelector("#today-description");
  let humidityToday = document.querySelector("#humidity-today");
  let todayWindSpeed = document.querySelector("#wind-speed");
  let todayTimeElement = document.querySelector("#today-time");
  let date = new Date(response.data.time * 1000);
  let todayicon = document.querySelector("#today-icon");

  todayicon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
  todayTimeElement.innerHTML = formatDay(date);
  city.innerHTML = response.data.city;
  todayTemperatureElement.innerHTML = Math.round(todayTemp);
  todayDescription.innerHTML = response.data.condition.description;
  humidityToday.innerHTML = `${response.data.temperature.humidity}%`;
  todayWindSpeed.innerHTML = `${response.data.wind.speed} km/h`;

  getForecast(response.data.city);
}

function formatDay(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b35bde4cf0218ab6t254ff1549244of3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-input");
  searchCity(searchFormInput.value);
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b35bde4cf0218ab6t254ff1549244of3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);

  let forecast = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
   <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatWeekDay(day.time)}</div>
          <div class="weather-forecast-icon"> <img src="${
            day.condition.icon_url
          }" /> </div>
          <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}º</strong>
              </div>
              <div class="weather-forecast-temperature"> ${Math.round(
                day.temperature.minimum
              )}º</div>
            </div>
          </div>
          `;
    }
  });

  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form-element");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
displayForecast();

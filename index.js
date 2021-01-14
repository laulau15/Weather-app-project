let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = document.querySelector("#current-date");
date.innerHTML = `🕓 ${day} ${hours}:${minutes}`;

//Temperature

function showWeather(response) {
  console.log(response);
  let cityName = response.data.name;
  let cityDisplay = document.querySelector("#actual-place");
  cityDisplay.innerHTML = `📍 ${cityName}`;

  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#temp");
  showTemperature.innerHTML = `🌡️ ${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#current-humidty");
  showHumidity.innerHTML = ` Humidity: ${humidity}% -`;

  let windSpeed = Math.round(response.data.wind.speed);
  let showWindSpeed = document.querySelector("#current-wind");
  showWindSpeed.innerHTML = `Wind: ${windSpeed}km/h`;

  let aspect = response.data.weather[0].description;
  let weatherAspect = document.querySelector("#weather-aspect");
  weatherAspect.innerHTML = aspect;

  let emoji = response.data.weather[0].icon;
  let weatherIcon=document.querySelector("#weather-icon");
  weatherIcon.setAttribute("alt",`${aspect}`); 
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${emoji}@2x.png`);
}

function searchCity(city) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let citySearched = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function searchedPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

let place = document.querySelector("#form-city");
place.addEventListener("submit", searchedPlace);

searchCity("Paris");

//Fahrenheit
function showWeatherFahrenheit(response) {
  console.log(response);
  let cityName = response.data.name;
  let cityDisplay = document.querySelector("#actual-place");
  cityDisplay.innerHTML = `📍 ${cityName}`;

  let temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#temp");
  showTemperature.innerHTML = `🌡️ ${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#current-humidty");
  showHumidity.innerHTML = ` Humidity: ${humidity}% -`;

  let windSpeed = Math.round(response.data.wind.speed);
  let showWindSpeed = document.querySelector("#current-wind");
  showWindSpeed.innerHTML = `Wind: ${windSpeed}mi/h`;

  let aspect = response.data.weather[0].description;
  let weatherAspect = document.querySelector("#weather-aspect");
  weatherAspect.innerHTML = aspect;

  let emoji = response.data.weather[0].icon;
  let weatherIcon=document.querySelector("#weather-icon");
  weatherIcon.setAttribute("alt",`${aspect}`); 
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${emoji}@2x.png`);
}

function fahrenheitWeather(location) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let cityFahrenheit = location;
  let fUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFahrenheit}&appid=${apiKey}&units=imperial`;
  axios.get(`${fUrl}`).then(showWeatherFahrenheit);
}
function fahrenheitPlace (event){
  event.preventDefault()
  let location = document.querySelector("#search-engine").value;
  fahrenheitWeather(location)
}
let unitFahrenheit=document.querySelector("#fahrenheit-temp");
unitFahrenheit.addEventListener("click", fahrenheitPlace);

//Back to Celsius

let unitCelsius=document.querySelector("#celsius-temp");
unitCelsius.addEventListener("click",searchedPlace);

//Your position
function showPositionWeather(position) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${url}`).then(showWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}

let buttonLocation = document.querySelector("#position");
buttonLocation.addEventListener("click", currentPosition);

//Position Fahrenheit

function showPositionWeatherFahrenheit(position) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${url}`).then(showWeatherFahrenheit);
}

function currentPositionFahrenheit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeatherFahrenheit);
}

let positionFahrenheit=document.querySelector("#fahrenheit-temp");
positionFahrenheit.addEventListener("click",currentPositionFahrenheit);

//Back to Celsius

let backCelsius=document.querySelector("#celsius-temp");
backCelsius.addEventListener("click",currentPosition);

//Forecast
function weatherForecast(response) {
  let tomorrowTemp = document.querySelector("#tomorrow-temp");
  tomorrowTemp.innerHTML = `${Math.round(response.data.list[5].main.temp)}°C`;
}

function showForecast(city) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let cityForecast = city;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityForecast}&appid=${apiKey}&units=metric`;
  axios.get(`${forecastUrl}`).then(weatherForecast);
}

function forecastPlace(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  showForecast(city);
}

let forecast = document.querySelector("#form-city");
forecast.addEventListener("submit", forecastPlace);

showForecast("Paris");

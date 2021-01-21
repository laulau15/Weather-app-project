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

  temperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#temp");
  showTemperature.innerHTML = `🌡️ ${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#current-humidty");
  showHumidity.innerHTML = ` Humidity: ${humidity}% -`;

  windSpeed = Math.round(response.data.wind.speed);
  let showWindSpeed = document.querySelector("#current-wind");
  showWindSpeed.innerHTML = `Wind: ${windSpeed}km/h`;

  let aspect = response.data.weather[0].description;
  let weatherAspect = document.querySelector("#weather-aspect");
  weatherAspect.innerHTML = aspect;

  let emoji = response.data.weather[0].icon;
  let weatherIcon=document.querySelector("#weather-icon");
  weatherIcon.setAttribute("alt",`${aspect}`); 
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${emoji}@2x.png`);

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey= "94b2fe75b3990cc22ffb26dbd43023bc";
  let forecastUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(`${forecastUrl}`).then(displayForecast);
  
}

function searchCity(city) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let citySearched = city;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function searchedPlace(event) {
  event.preventDefault();

  unitFahrenheit.classList.remove("active");
  unitCelsius.classList.add("active");

  let city = document.querySelector("#search-engine").value;
  searchCity(city);
}

let place = document.querySelector("#form-city");
place.addEventListener("submit", searchedPlace);

searchCity("Paris");

//Temperature in Fahrenheit

function fahrenheitPlace (event){
  event.preventDefault();
  let transformTemperature=document.querySelector("#temp");
  let fahrenheitTemperature=Math.round(temperature * 1.8 + 32);
  transformTemperature.innerHTML=`🌡️ ${fahrenheitTemperature}`;

  unitFahrenheit.classList.add("active");
  unitCelsius.classList.remove("active");

  let transformWind=document.querySelector("#current-wind");
  let milesWind=Math.round(windSpeed/1.609);
  transformWind.innerHTML=`Wind: ${milesWind}mi/h`;
}
let unitFahrenheit=document.querySelector("#fahrenheit-temp");
unitFahrenheit.addEventListener("click", fahrenheitPlace);

//Back to Celsius
function backToCelsius(){
  let temperatureElement = document.querySelector("#temp");
  let tempBackToCelsius = Math.round(((temperature * 1.8 + 32)-32)/1.8);
  temperatureElement.innerHTML=`🌡️${tempBackToCelsius}`;
  unitFahrenheit.classList.remove("active");
  unitCelsius.classList.add("active");
}

let unitCelsius=document.querySelector("#celsius-temp");
unitCelsius.addEventListener("click",backToCelsius);

//Your position
function showPositionWeather(position) {
  let apiKey = "94b2fe75b3990cc22ffb26dbd43023bc";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${url}`).then(showWeather);

let forecastUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
axios.get(`${forecastUrl}`).then(displayForecast);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPositionWeather);
}
let buttonLocation = document.querySelector("#position");
buttonLocation.addEventListener("click", currentPosition);


//Forecast 
function displayForecast(forecast){
  console.log(forecast);
let tomorrowTemp=document.querySelector("#tomorrow-temp");
tomorrowTemp.innerHTML=`${Math.round(forecast.data.daily[1].feels_like.day)}°C`;
let tomorrowIcon= document.querySelector("#tomorrow-icon");
let tomorrowEmoji=forecast.data.daily[1].weather[0].icon;
tomorrowIcon.setAttribute("src",`http://openweathermap.org/img/wn/${tomorrowEmoji}@2x.png`);
let tomorrowHumidity=document.querySelector("#tomorrow-humidity");
tomorrowHumidity.innerHTML=` ${Math.round(forecast.data.daily[1].humidity)}`;
let tomorrowWind=document.querySelector("#tomorrow-wind");
tomorrowWind.innerHTML=`${Math.round(forecast.data.daily[1].wind_speed)}`;
let tomorrowAspect=document.querySelector("#tomorrow-description");
tomorrowAspect.innerHTML=`${forecast.data.daily[1].weather[0].description}`;
tomorrowIcon.setAttribute("alt",`${forecast.data.daily[1].weather[0].description}`);

let twoDayTemp=document.querySelector("#two-day-temp");
twoDayTemp.innerHTML=`${Math.round(forecast.data.daily[2].feels_like.day)}°C`;
let secondIcon= document.querySelector("#two-day-icon");
let secondEmoji=forecast.data.daily[2].weather[0].icon;
secondIcon.setAttribute("src",`http://openweathermap.org/img/wn/${secondEmoji}@2x.png`);
let twoDayHumidity=document.querySelector("#two-day-humidity");
twoDayHumidity.innerHTML=` ${Math.round(forecast.data.daily[2].humidity)}`;
let twoDayWind=document.querySelector("#two-day-wind");
twoDayWind.innerHTML=`${Math.round(forecast.data.daily[2].wind_speed)}`;
let twoDayAspect=document.querySelector("#two-day-description");
twoDayAspect.innerHTML=`${forecast.data.daily[2].weather[0].description}`;
secondIcon.setAttribute("alt",`${forecast.data.daily[2].weather[0].description}`);

let threeDayTemp=document.querySelector("#three-day-temp");
threeDayTemp.innerHTML=`${Math.round(forecast.data.daily[3].feels_like.day)}°C`;
let thirdIcon= document.querySelector("#three-day-icon");
let thirdEmoji=forecast.data.daily[3].weather[0].icon;
thirdIcon.setAttribute("src",`http://openweathermap.org/img/wn/${thirdEmoji}@2x.png`);
let threeDayHumidity=document.querySelector("#three-day-humidity");
threeDayHumidity.innerHTML=` ${Math.round(forecast.data.daily[3].humidity)}`;
let threeDayWind=document.querySelector("#three-day-wind");
threeDayWind.innerHTML=`${Math.round(forecast.data.daily[3].wind_speed)}`;
let threeDayAspect=document.querySelector("#three-day-description");
threeDayAspect.innerHTML=`${forecast.data.daily[3].weather[0].description}`;
thirdIcon.setAttribute("alt",`${forecast.data.daily[3].weather[0].description}`);

let fourDayTemp=document.querySelector("#four-day-temp");
fourDayTemp.innerHTML=`${Math.round(forecast.data.daily[4].feels_like.day)}°C`;
let fourthIcon= document.querySelector("#four-day-icon");
let fourthEmoji=forecast.data.daily[4].weather[0].icon;
fourthIcon.setAttribute("src",`http://openweathermap.org/img/wn/${fourthEmoji}@2x.png`);
let fourDayHumidity=document.querySelector("#four-day-humidity");
fourDayHumidity.innerHTML=` ${Math.round(forecast.data.daily[4].humidity)}`;
let fourDayWind=document.querySelector("#four-day-wind");
fourDayWind.innerHTML=`${Math.round(forecast.data.daily[4].wind_speed)}`;
let fourDayAspect=document.querySelector("#four-day-description");
fourDayAspect.innerHTML=`${forecast.data.daily[4].weather[0].description}`;
fourthIcon.setAttribute("alt",`${forecast.data.daily[4].weather[0].description}`);

let fiveDayTemp=document.querySelector("#five-day-temp");
fiveDayTemp.innerHTML=`${Math.round(forecast.data.daily[5].feels_like.day)}°C`;
let fithIcon= document.querySelector("#five-day-icon");
let fithEmoji=forecast.data.daily[5].weather[0].icon;
fithIcon.setAttribute("src",`http://openweathermap.org/img/wn/${fithEmoji}@2x.png`);
let fiveDayHumidity=document.querySelector("#five-day-humidity");
fiveDayHumidity.innerHTML=` ${Math.round(forecast.data.daily[5].humidity)}`;
let fiveDayWind=document.querySelector("#five-day-wind");
fiveDayWind.innerHTML=`${Math.round(forecast.data.daily[5].wind_speed)}`;
let fiveDayAspect=document.querySelector("#five-day-description");
fiveDayAspect.innerHTML=`${forecast.data.daily[5].weather[0].description}`;
fithIcon.setAttribute("alt",`${forecast.data.daily[5].weather[0].description}`);
}

let temperature="";
let windSpeed="";

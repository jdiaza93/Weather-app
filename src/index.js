//time and date
let currentDate = new Date();
let h2 = document.querySelector("h2");
let daysWeek =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = daysWeek[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes > 10) {
h2.innerHTML = `${day} ${hour}:${minutes}`;
} else {
h2.innerHTML = `${day} ${hour}:0${minutes}`;
}

//current position
  function currentPosition (position){
      function displayCityWeather (response){
      let currentTemp = document.querySelector("#current-temp");
      currentTemp.innerHTML = `${Math.round(response.data.main.temp_max)}/${Math.round(response.data.main.temp_min)} `;

      let currentHumidity = document.querySelector("#humidity");
      currentHumidity.innerHTML = `${response.data.main.humidity}%`;

      let currentWindSpeed = document.querySelector("#wind");
      currentWindSpeed.innerHTML = `${Math.round(response.data.wind.speed)} Km/h`

      let weatherDescription = document.querySelector("#weather-description");
      weatherDescription.innerHTML = (response.data.weather[0].description);

      let cityName = document.querySelector("h1");
      cityName.innerHTML = response.data.name;

      celciousTempMax = Math.round(response.data.main.temp_max);
      celciousTempMin = Math.round(response.data.main.temp_min);
      coordLatitude = response.data.latitude;
      coordLongitude = response.data.longitude;

      function weatherIconChange(){
      let weatherType = response.data.weather[0].main;
      let weatherIcon = document.querySelector("#weather-image");
      let backgroundColor = document.querySelector("main")
      if (weatherType === "Clouds") {
      weatherIcon.setAttribute("src", `images/Clouds.svg`);
      backgroundColor.className = "cloud-weather app-body"
      }
      else
      if (weatherType === "Rain") {
      weatherIcon.setAttribute("src", `images/Rain.svg`);
      backgroundColor.className = "rain-weather app-body"
      }
      else
      if (weatherType === "Clear") {
        weatherIcon.setAttribute("src", `images/Clear.svg`)
        backgroundColor.className = "clear-weather app-body"
      }
      else
      if (weatherType === "Thunderstorm") {
        weatherIcon.setAttribute("src", `images/Thunderstorm.svg`)
        backgroundColor.className = "thunder-weather app-body"
      }
      else
      if (weatherType === "Drizzle") {
        weatherIcon.setAttribute("src", `images/Drizzle.svg`)
        backgroundColor.className = "drizzle-weather app-body"
      }
      else
      if (weatherType === "Snow") {
        weatherIcon.setAttribute("src", `images/Snow.svg`)
        backgroundColor.className = "snow-weather app-body"
      }
      else
      if (weatherType === "Mist") {
        weatherIcon.setAttribute("src", `images/Mist.svg`)
        backgroundColor.className = "mist-weather app-body"
      }
      }
      weatherIconChange();
      getForcastCoords(response.data.coord)
  }
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=70a117d10548a7cde81c5d73ab55d01b&units=metric`;
   axios.get(apiUrl).then(displayCityWeather)
  }
  navigator.geolocation.getCurrentPosition(currentPosition);


//city search
  function citySubmit(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityHTML = document.querySelector("h1");
  cityHTML.innerHTML = (`${cityInput.value}`)

  function displayCityWeather (response){
      let currentTemp = document.querySelector("#current-temp");
      currentTemp.innerHTML = `${Math.round(response.data.main.temp_max)}/${Math.round(response.data.main.temp_min)} `;

      let currentHumidity = document.querySelector("#humidity");
      currentHumidity.innerHTML = `${response.data.main.humidity}%`;

      let currentWindSpeed = document.querySelector("#wind");
      currentWindSpeed.innerHTML = `${Math.round(response.data.wind.speed)} Km/h`

      let weatherDescription = document.querySelector("#weather-description");
      weatherDescription.innerHTML = (response.data.weather[0].description);

      celciousTempMax = Math.round(response.data.main.temp_max);
      celciousTempMin = Math.round(response.data.main.temp_min);

      let weatherType = response.data.weather[0].main;
      let weatherIcon = document.querySelector("#weather-image");
      let backgroundColor = document.querySelector("main")
      if (weatherType === "Clouds") {
      weatherIcon.setAttribute("src", `images/Clouds.svg`);
      backgroundColor.className = "cloud-weather app-body"
      }
      else
      if (weatherType === "Rain") {
      weatherIcon.setAttribute("src", `images/Rain.svg`);
      backgroundColor.className = "rain-weather app-body"
      }
      else
      if (weatherType === "Clear") {
        weatherIcon.setAttribute("src", `images/Clear.svg`)
        backgroundColor.className = "clear-weather app-body"
      }
      else
      if (weatherType === "Thunderstorm") {
        weatherIcon.setAttribute("src", `images/Thunderstorm.svg`)
        backgroundColor.className = "thunder-weather app-body"
      }
      else
      if (weatherType === "Drizzle") {
        weatherIcon.setAttribute("src", `images/Drizzle.svg`)
        backgroundColor.className = "drizzle-weather app-body"
      }
      else
      if (weatherType === "Snow") {
        weatherIcon.setAttribute("src", `images/Snow.svg`)
        backgroundColor.className = "snow-weather app-body"
      }
      else
      if (weatherType === "Mist") {
        weatherIcon.setAttribute("src", `images/Mist.svg`)
        backgroundColor.className = "mist-weather app-body"
      }
      getForcastCoords(response.data.coord)

  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=70a117d10548a7cde81c5d73ab55d01b&units=metric`;
  axios.get(apiUrl).then(displayCityWeather)
}

let cityForm = document.querySelector("#city-search");
cityForm.addEventListener("submit", citySubmit);

//Unit convertion
let celciousTempMax = null;
let celciousTempMin = null;

function celsClick (event){
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = (celciousTempMax + "/" + celciousTempMin);
}
let celsiusTemp = document.querySelector("#celcious-click");
celsiusTemp.addEventListener("click", celsClick);

function fahrClick(event){
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = (Math.round(celciousTempMax*9/5 + 32) + "/" + Math.round(celciousTempMin*9/5 + 32));
}
let fahrTemp = document.querySelector("#fahrenheit-click");
fahrTemp.addEventListener("click", fahrClick)

/// forecast
function getForcastCoords(coordinates){
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=2980ff43226d67e53abfcdb6d457dcc8&units=metric`;
  axios.get(forecastURL).then(forecastDisplay)
}

function formatDayForecast(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[day];
}

function forecastDisplay(forecastResponse){
  let forecast = forecastResponse.data.daily;
  let forecastTemplate = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
  if (index < 7 && index > 0){
  forecastHTML = 
  forecastHTML + `<div class="col">
			<div>${formatDayForecast(forecastDay.dt)}</div>
			<br>
			<img src="images/${forecastDay.weather[0].main}.svg" alt="" id="forcast-image">
			<br>
			${Math.round(forecastDay.temp.max)}°/${Math.round(forecastDay.temp.min)}°
		</div>`;
  }})

  forecastHTML = forecastHTML + `</div>`;
  forecastTemplate.innerHTML = forecastHTML;
}




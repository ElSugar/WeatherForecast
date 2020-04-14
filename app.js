const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

const weather = {};;

weather.temperature = {
  unit: "celsius"
}

const KELV = 273;

const key = "f616afccbe8d4877daef3e9161357d4a";

// check geolocation
if("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't support geolocation</p>"
}

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

function showError(error){
  notificationElement.getElementsByClassName.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

function getWeather(latitude, longitude){
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
      .then(function(response){
          let data = response.json();
          return data;
      })
      .then(function(data){
          weather.temperature.value = Math.floor(data.main.temp - KELV);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
      })
      .then(function(){
          displayWeather();
      });
}

function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}&#176;C`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

function celsiusToKelvin(temperature){
  return (temperature + 273);
}

tempElement.addEventListener("click", function(){
  if(weather.temperature.value === undefined) return;
  if(weather.temperature.unit == "celsius"){
      let kelvin = celsiusToKelvin(weather.temperature.value);
      kelvin = Math.floor(kelvin);
      tempElement.innerHTML = `${kelvin} K`;
      weather.temperature.unit = "kelvin";
  }else{
      tempElement.innerHTML = `${weather.temperature.value}&#176;C`;
      weather.temperature.unit = "celsius"
  }
});
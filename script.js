'use strict'
let weather = {
  apiKey: "b16093a76eedb28ba76a7c1fad877b17",
  fetchWeather: (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weather.apiKey}` //why didnt it accept 'this'?
    )
      .then((response) => response.json())
      .then((data) => weather.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name,icon,description,temp,humidity,speed);
    document.querySelector(".city").innerHTML = `Weather in ${name}.`;
    document.querySelector(".temp").innerHTML = `${temp}°C`;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png"
    document.querySelector(".description").innerHTML =description;
    document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerHTML = `Wind Speed: ${speed} km/h`
    document.querySelector(".weather").classList.remove("loading");
  },
  search : function (){
    weather.fetchWeather(document.querySelector(".search-bar").value)
  }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e){
    if(e.key == "Enter") {
        weather.search()
    };
});

weather.fetchWeather("Ankara");

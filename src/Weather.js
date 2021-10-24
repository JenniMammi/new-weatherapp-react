import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  let [weatherData, setWeatherData] = useState({ ready: false });
  let [city, setCity] = useState(props.defaultCity);

  function handleSubmit(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      date: new Date(response.data.dt * 1000),
      time: "07:30",
      temperature: response.data.main.temp,
      feelslike: response.data.main.feels_like,
      city: response.data.name,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
    });
  }

  function search() {
    let apiKey = "02e63bbc86dac944d774fba2018e7b56";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleSubmit);
  }

  function handleSearch(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSearch}>
          <div className="Search">
            <input
              type="search"
              placeholder="Search city"
              className="searchfield"
              autoFocus="on"
              onChange={handleCityChange}
            />

            <input type="submit" value="Search" className="searchbutton" />
          </div>
        </form>
        <WeatherInfo data={weatherData} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}

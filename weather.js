"use strict";
// alert("connected");

// forecast btn click
const btn_weather = document.querySelector("#forecast");
btn_weather.addEventListener("click", getData);
const weatherInfo = document.querySelector("#weather_info");

//function that getsData
// get Zipcode.value from input

function getData() {
  const zipCode = document.querySelector("#zipcode").value;
  // alert(zipCode);
  //call getWeather and pass zipcode, can be the same name, doesnt matter;
  getWeather(zipCode);
}

// function that recieves Weather Data
// this f-on sets up AJAX call
// to get weather for this zipCode
// to check if it works:
// console.log("zipcode is "+zip);
//set up url to req data:
function getWeather(zip) {
  // first part of url
  const endpoint = "https://api.openweathermap.org/data/2.5/weather";
  // second is a key
  const myApiKey = "580ccf6fb3097445d2bb75e65413c857";
  const url = `${endpoint}?zip=${zip}&units=imperial&appid=${myApiKey}`;

  // setUp req
  // Create an Object

  const xhr = new XMLHttpRequest();
  //set up action when data is returned call responseHandler() that you are going to create:
  xhr.addEventListener("load", responseHandler);

  // REQUIRED FOR JSON:
  xhr.responseType = "json";

  // open the connection:
  xhr.open("GET", url);
  xhr.send();
}

function responseHandler() {
  //this f-on is called when data is recieved:
  weatherInfo.innerHTML = "";

  //1.check is status is 200
  if (this.status == 200) {
    const data = this.response;
    const html = `
    <p>City: ${data.name} </br>
        Temperature: ${data.main.temp} </br>
        Sky: ${data.weather[0].description}
    </p>`;
    weatherInfo.innerHTML = html;
    return;
  }
  //put error message:
  weatherInfo.innerHTML = `Weather data unavailable`;
}

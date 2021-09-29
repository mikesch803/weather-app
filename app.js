var city = document.querySelector("#city-name");

var btn = document.querySelector(".check-btn");

var output = document.querySelector("#output");

var apikey = "ed314dda4cb8d8cc10a08799a0560276";

window.addEventListener("load", function () {
  let lat, long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      var api =
        "https://api.openweathermap.org/data/2.5/weather?lat=23.0685713&lon=70.1110318&appid=" +
        apikey;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          const tempInKelvin = data.main.temp_max;
          const tempInCelsius = (tempInKelvin - 273.15).toFixed(0);
          output.innerHTML = `<h1>temp is ${tempInCelsius} C in ${data.name} </h1>
                                <h2>${data.weather[0].description}</h2>
                                <p>wind's speed ${data.wind.speed} km/h</p>`;
        });
    });
  }
});

btn.addEventListener("click", function () {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city.value +
    "&appid=" +
    apikey;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const tempInKelvin = data.main.temp_max;
        const tempInCelsius = (tempInKelvin - 273.15).toFixed(0);
        output.innerHTML = `<h1>temp is ${tempInCelsius} C in ${data.name} </h1>
                              <h2>${data.weather[0].description}</h2>
                              <p>wind's speed ${data.wind.speed} km/h</p>`;
    });
});

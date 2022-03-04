var city = document.querySelector("#city-name");

var btn = document.querySelector(".check-btn");

var output = document.querySelector("#output");

var body = document.querySelector("body");

var themeBtn = document.querySelector("#switch");

var apikey = "ed314dda4cb8d8cc10a08799a0560276";

themeBtn.addEventListener("change", function () {
  var element = document.querySelector(".app");
  element.classList.toggle("dark-mode");
});

// common fetch function
function fetchAPI(api) {
  return fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const tempInKelvin = data.main.temp_max;
      const tempInCelsius = (tempInKelvin - 273.15).toFixed(0);
      output.innerHTML = `<h1 id='temp-degree'>${tempInCelsius} <span id='temp-c'>C</span></h1>
                       <h2 id='temp-city'>${data.name}</h2>
                        <h2 id='city-condn'>${data.weather[0].description}</h2>
                        <p id='wind-speed' >wind's speed ${data.wind.speed} km/h</p>`;
    });
}


/**when browser gets loads */
window.addEventListener("load", function () {
  let lat, long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var api =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=" +
        apikey;
      fetchAPI(api);
    });
  }
});

btn.addEventListener("click", function () {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city.value +
    "&appid=" +
    apikey;
  fetchAPI(url);
});

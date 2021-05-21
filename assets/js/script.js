//Global Variables:
//Search Elements
var searchContainer = $(".search-form-container");
var searchInput = $(".search-input");
var searchButton = $(".search-btn");
var clearHistoryButton = $(".clear-history-btn");
var cityContainer = $(".city-container");
var cityResults = $(".city-results");

//Current Weather Elements
var currentWeatherContainer = $(".current-weather-container");
var cityNameTitle = $(".city-name-title");
var currentWeatherIcon = $(".current-weather");
var temperature = $(".temperature");
var humidity = $(".humidity");
var wind = $(".wind");
var uvIndex = $(".uv-index");
var weatherForecast = $(".weather-forecast");

//Weather API key
var apiKey = "f1297039f6aa07eefba2bdda4c4c9199";

//Function that fetches weather API from user input and search click
function searchResults(locationObject) {
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=" + {lat} + "&lon=" + {lon} + "&exclude=" + {part} + "&appid=" + `;
    var {lat} = locationObject
    var {lon} = locationObject
    fetch().then 

};

function getCoordinates(search) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data.coord);
        })
}

function handleSearch(event) {
    event.preventDefault();
    var search = searchInput.value.trim()
    console.log(search);
    getCoordinates(search);
    searchInput.value = "";
};

searchButton.on("click", handleSearch);

//Function that creates div elements to city-results

//Function that clears city-results when clicked

//Function that create

//searchResults();
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

//Variable that stores city results
var cityStorage = [];

//Fetches weather API from user input and search click
//Make variables
// Add &exclude=${ part } to var api when we have that defined. For units of measurements
function searchResults(coord) {
    var { lat, lon } = coord;
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityStorage.push(data)
        });
    //Then you can add a function which iterates over that array and renders an element for each.
    //     function iterateStorageArray() {
    // cityStorage.forEach()
    //     };
    // $(".city-results").each(function () {
    //     $("li").append(cityStorage);
    // });
    // searchCity = $('.search-input').val();
    // console.log(searchCity)
    // $('.search-input').val("");

};

//Fetches city geographical locations
function getCoordinates(search) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            searchResults(data.coord);
        })
}

//Trims empty spaces from user input
function handleSearch(event) {
    event.preventDefault();
    var search = searchInput.val().trim();
    console.log(search);
    getCoordinates(search);
    searchInput.val("");

    searchCity = $('.search-input').val();
    console.log(searchCity)
    // $('.search-input').val("");
    var itemList = $('<li>').addClass('.city-results').text(searchCity)
        $(".city-results").append(itemList)
        console.log(itemList);
};

//When search button is clicked the handleSearch function is called
searchButton.on("click", handleSearch);

//Creates city list elements and appends them  to city-results
function appendListedCity() {
    // var enteredCity = searchResults(cityResults);
    // $(".city-results").append("<li>" + enteredCity + "</li>");
    // console.log(enteredCity);  

};

//Function that clears city-results when clicked

//Function that create

// searchResults();

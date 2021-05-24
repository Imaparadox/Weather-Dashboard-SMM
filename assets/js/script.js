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
var currentWeatherIcon = $(".current-weather-icon");
var temperature = $(".temperature");
var humidity = $(".humidity");
var wind = $(".wind");
var uvIndex = $(".uv-index");
var weatherForecast = $(".weather-forecast");

//Weather API key
var apiKey = "f1297039f6aa07eefba2bdda4c4c9199";

//Variable that stores city results
var cityStorage = [];

//Today's date
var currentDate = moment().format("L");
$(".current-date").text("(" + currentDate + ")");

//Fetches weather API from user input and search click
function searchResults(coord) {
    var { lat, lon } = coord;
    var api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        //Takes the data from fetch and displays the data in the web browser
        .then(function (data) {
            cityStorage.push(data)
            console.log(data);
            //Current weather is displayed in the browser window
            temperature.text("Temperature: " + data.current.temp + " °F");
            humidity.text("Humidity: " + data.current.humidity + " %");
            wind.text("Wind Speed: " + data.current.wind_speed + " mph");
            uvIndex.text("UV Index: " + data.current.uvi);
            currentWeatherIcon.append($("<img>").attr("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"))
            //Changes the color of the text based on the current uv index
            handleUvIndex(data);
        });
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
        });
};

//Handles the search and calls the getCoordinates() function
function handleSearch(event) {
    //Trims empty spaces from user input
    event.preventDefault();
    var search = searchInput.val().trim();
    console.log(search);
    getCoordinates(search);
    searchInput.val("");

    //Creates city list elements and appends them  to city-results
    var itemList = $('<li>').addClass('.city-results').text(search);
    $(".city-results").append(itemList);

    //Appends search result to city-name-title h3
    $("#city-name-title").addClass('.city-name-title').text(search);
    $(".city-name-title").append(cityNameTitle);
};

//When search button is clicked the handleSearch function is called
searchButton.on("click", handleSearch);

//When clear history button is clicked the city list items are removed
$(".clear-history-btn").click(function () { $("li").remove() });

//
function handleUvIndex(data) {
    if (data.current.uvi <= 2) {
        uvIndex.addClass("badge bg-success text-dark");
    } else if (data.current.uvi > 4 && data.current.uvi <= 7) {
        uvIndex.removeClass("badge bg-success");
        uvIndex.addClass("badge bg-warning text-dark");
    } else {
        uvIndex.removeClass("badge bg-success");
        uvIndex.removeClass("badge bg-warning text-dark");
        uvIndex.addClass("badge bg-danger");
    }
};



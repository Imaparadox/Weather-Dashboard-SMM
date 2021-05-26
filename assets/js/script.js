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
            //Displays the five day forecast 
            fiveDayForecast(data);
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
function handleSearch(cityName) {
    //Trims empty spaces from user input
    cityName.preventDefault();
    var search = searchInput.val().trim();
    console.log(search);
    getCoordinates(search);
    searchInput.val("");
    //Calls the .on click function
    historyClick(cityName)
    //Creates city list elements and appends them  to city-results
    var itemList = $('<li>').addClass('.city-results').text(search);
    $(".city-results").append(itemList);
    //Appends search result to city-name-title h3
    $("#city-name-title").addClass('.city-name-title').text(search);
    $(".city-name-title").append(cityNameTitle);
    //Removes repeated cards
    $(".weather-card-body").remove();
    // $(currentWeatherIcon).remove();

};

//Click on the city result element to see storage
function historyClick() {
    $(".city-results").click(function () {
        var clickEl = $(this).attr("id");
        console.log(clickEl);
        // handleSearch(clickEl);
    });
    //Current Weather info
    // localStorage.setItem("city-current", JSON.stringify(data.current));
    // //Five day forecast
    // localStorage.setItem("city-daily", JSON.stringify(data.daily));
    // //Local Storage
    // var currentCityResult = JSON.parse(localStorage.getItem("city-current"));
    // var dailyCityResult = JSON.parse(localStorage.getItem("city-daily"));
    // console.log(currentCityResult)
    // console.log(dailyCityResult)
};

//Calls the handleSearch()
function historySearch(event) {
    var city = event.target.text
    handleSearch(city)
    // historyClick(city)
};

//When search button is clicked the handleSearch function is called
searchButton.on("click", handleSearch);
//When clear history button is clicked the city list items are removed
$(".clear-history-btn").click(function () { $("li").remove() });

//Handles uv index
function handleUvIndex(data) {
    //Changes the class colors based on the uv rating 
    uvIndex.addClass("badge");
    if (data.current.uvi < 3) {
        uvIndex.removeClass("bg-warning text-dark bg-danger")
        uvIndex.addClass("bg-success");
    } else if (data.current.uvi >= 3 && data.current.uvi < 6) {
        uvIndex.removeClass("bg-success bg-danger");
        uvIndex.addClass("bg-warning text-dark");
    } else if (data.current.uvi >= 6 && data.current.uvi < 8) {
        uvIndex.removeClass("bg-warning text-dark bg-success");
        uvIndex.addClass("bg-danger");
    } else {
        uvIndex.removeClass("bg-warning text-dark bg-success");
        uvIndex.addClass("bg-danger");
    }
};

//Displays the five day fore cast for selected city 
function fiveDayForecast(data) {
    //Variable that stores the daily object
    var fiveDayWeather = data.daily;
    //For loop that will iterate 5 weather cards
    for (var i = 1; i < 6; i++) {
        console.log(fiveDayWeather[i]);
        //Date for 5 day forecast
        var fiveDayDaily = data.daily[i].dt;
        var date = new Date(fiveDayDaily * 1000);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        // Query Selectors that will append divs with card classes to weatherForecast
        //Card containers
        var weatherForecastCol = $("<div class='col-12 col-md-6 col-lg mb-3'>");
        var weatherForecastCard = $("<div class='weather-card text-dark bg-light'>");
        var weatherForecastBody = $("<div class='weather-card-body'>");
        //Card text
        var weatherForecastDate = $("<h5 class='weather-card-title'>");
        var weatherForecastIcon = $("<img>");
        var weatherForecastTemp = $("<p class='weather-card-text mb-0'>");
        var weatherForecastHumidity = $("<p class='weather-card-text mb-0'>");
        //Append to containers
        weatherForecast.append(weatherForecastCol);
        weatherForecastCol.append(weatherForecastCard);
        weatherForecastCard.append(weatherForecastBody);
        //Append to text
        weatherForecastBody.append(weatherForecastDate);
        weatherForecastBody.append(weatherForecastIcon);
        weatherForecastBody.append(weatherForecastTemp);
        weatherForecastBody.append(weatherForecastHumidity);
        //Entering info into cards 
        weatherForecastDate.text(`${month}/${day}/${year}`);
        weatherForecastIcon.attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
        weatherForecastTemp.text("Temperature: " + data.daily[i].temp.day + " °F");
        weatherForecastHumidity.text("Humidity: " + data.daily[i].humidity + " %");
    };
};


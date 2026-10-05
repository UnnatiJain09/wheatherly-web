/* =========================================
   WEATHERLY — WEATHER APPLICATION
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const searchForm =
    document.querySelector("#search-form");

const cityInput =
    document.querySelector("#city-input");

const searchButton =
    document.querySelector("#search-button");

const refreshButton =
    document.querySelector("#refresh-btn");

const themeToggle =
    document.querySelector("#theme-toggle");

const statusMessage =
    document.querySelector("#status-message");

const statusText =
    document.querySelector("#status-text");

const loadingState =
    document.querySelector("#loading-state");

const weatherContent =
    document.querySelector("#weather-content");

const welcomeState =
    document.querySelector("#welcome-state");

const locationName =
    document.querySelector("#location-name");

const locationCountry =
    document.querySelector("#location-country");

const currentDate =
    document.querySelector("#current-date");

const currentTime =
    document.querySelector("#current-time");

const weatherIcon =
    document.querySelector("#weather-icon");

const temperature =
    document.querySelector("#temperature");

const weatherDescription =
    document.querySelector("#weather-description");

const feelsLike =
    document.querySelector("#feels-like");

const humidity =
    document.querySelector("#humidity");

const windSpeed =
    document.querySelector("#wind-speed");

const visibility =
    document.querySelector("#visibility");

const pressure =
    document.querySelector("#pressure");

const forecastGrid =
    document.querySelector("#forecast-grid");

const forecastLocation =
    document.querySelector("#forecast-location");

const lastUpdated =
    document.querySelector("#last-updated");


/* =========================================
   API CONFIGURATION
========================================= */

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


/* =========================================
   APPLICATION STATE
========================================= */

let currentWeatherData = null;
let currentLocation = null;
let isLoading = false;


/* =========================================
   WEATHER CODE MAPPING
========================================= */

function getWeatherInfo(code) {

    const weatherMap = {

        0: {
            description: "Clear Sky",
            icon: "☀️"
        },

        1: {
            description: "Mainly Clear",
            icon: "🌤️"
        },

        2: {
            description: "Partly Cloudy",
            icon: "⛅"
        },

        3: {
            description: "Overcast",
            icon: "☁️"
        },

        45: {
            description: "Foggy",
            icon: "🌫️"
        },

        48: {
            description: "Depositing Rime Fog",
            icon: "🌫️"
        },

        51: {
            description: "Light Drizzle",
            icon: "🌦️"
        },

        53: {
            description: "Moderate Drizzle",
            icon: "🌦️"
        },

        55: {
            description: "Dense Drizzle",
            icon: "🌧️"
        },

        56: {
            description: "Light Freezing Drizzle",
            icon: "🌧️"
        },

        57: {
            description: "Dense Freezing Drizzle",
            icon: "🌧️"
        },

        61: {
            description: "Slight Rain",
            icon: "🌦️"
        },

        63: {
            description: "Moderate Rain",
            icon: "🌧️"
        },

        65: {
            description: "Heavy Rain",
            icon: "🌧️"
        },

        66: {
            description: "Light Freezing Rain",
            icon: "🌧️"
        },

        67: {
            description: "Heavy Freezing Rain",
            icon: "🌧️"
        },

        71: {
            description: "Slight Snow",
            icon: "🌨️"
        },

        73: {
            description: "Moderate Snow",
            icon: "❄️"
        },

        75: {
            description: "Heavy Snow",
            icon: "❄️"
        },

        77: {
            description: "Snow Grains",
            icon: "🌨️"
        },

        80: {
            description: "Slight Rain Showers",
            icon: "🌦️"
        },

        81: {
            description: "Moderate Rain Showers",
            icon: "🌧️"
        },

        82: {
            description: "Violent Rain Showers",
            icon: "⛈️"
        },

        85: {
            description: "Slight Snow Showers",
            icon: "🌨️"
        },

        86: {
            description: "Heavy Snow Showers",
            icon: "❄️"
        },

        95: {
            description: "Thunderstorm",
            icon: "⛈️"
        },

        96: {
            description: "Thunderstorm With Hail",
            icon: "⛈️"
        },

        99: {
            description: "Thunderstorm With Heavy Hail",
            icon: "⛈️"
        }

    };

    return (
        weatherMap[code] || {
            description: "Unknown Conditions",
            icon: "🌤️"
        }
    );
}


/* =========================================
   DATE HELPERS
========================================= */

function formatDate(dateString) {

    const date =
        new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    );
}


function formatShortDay(dateString) {

    const date =
        new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "short"
        }
    );
}


/*
   Convert Open-Meteo local datetime
   into a readable time.
*/
function formatApiTime(dateTimeString) {

    if (!dateTimeString) {
        return formatTime();
    }

    const parts =
        dateTimeString.split("T");

    if (parts.length < 2) {
        return formatTime();
    }

    const timeParts =
        parts[1].split(":");

    let hours =
        Number(timeParts[0]);

    const minutes =
        timeParts[1];

    const period =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
}


function formatTime() {

    const now =
        new Date();

    return now.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================
   UI STATE
========================================= */

function showLoading() {

    isLoading = true;

    loadingState.hidden =
        false;

    weatherContent.hidden =
        true;

    welcomeState.hidden =
        true;

    statusMessage.hidden =
        true;

    searchButton.disabled =
        true;

    searchButton.textContent =
        "Searching...";
}


function hideLoading() {

    isLoading = false;

    loadingState.hidden =
        true;

    searchButton.disabled =
        false;

    searchButton.textContent =
        "Search";
}


function showError(message) {

    hideLoading();

    weatherContent.hidden =
        true;

    welcomeState.hidden =
        true;

    statusMessage.hidden =
        false;

    statusText.textContent =
        message;
}


function showWeatherContent() {

    hideLoading();

    statusMessage.hidden =
        true;

    welcomeState.hidden =
        true;

    weatherContent.hidden =
        false;
}


/* =========================================
   GEOCODING
========================================= */

async function getCoordinates(city) {

    const url =
        `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Unable to search for this city. Please check your internet connection."
        );
    }

    const data =
        await response.json();

    if (
        !data.results ||
        data.results.length === 0
    ) {

        throw new Error(
            "City not found. Please check the spelling and try again."
        );
    }

    return data.results[0];
}


/* =========================================
   WEATHER API
========================================= */

async function getWeather(
    latitude,
    longitude
) {

    const url =
        `${WEATHER_API}?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m` +
        `&hourly=visibility` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=auto` +
        `&forecast_days=5`;

    const response =
        await fetch(url);

    if (!response.ok) {

        throw new Error(
            "Unable to retrieve weather information. Please try again."
        );
    }

    const data =
        await response.json();

    return data;
}


/* =========================================
   DISPLAY CURRENT WEATHER
========================================= */

function displayCurrentWeather(
    location,
    data
) {

    const current =
        data.current;

    const weather =
        getWeatherInfo(
            current.weather_code
        );


    /* LOCATION */

    locationName.textContent =
        location.name;

    locationCountry.textContent =
        `${location.country || ""}${location.admin1 ? ` · ${location.admin1}` : ""}`;


    /* DATE AND TIME */

    const apiDate =
        current.time
            ? current.time.split("T")[0]
            : new Date().toISOString().split("T")[0];

    currentDate.textContent =
        formatDate(apiDate);

    currentTime.textContent =
        formatApiTime(current.time);


    /* WEATHER */

    weatherIcon.textContent =
        weather.icon;

    temperature.textContent =
        Math.round(
            current.temperature_2m
        );

    weatherDescription.textContent =
        weather.description;


    /* FEELS LIKE */

    feelsLike.textContent =
        `${Math.round(
            current.apparent_temperature
        )}°C`;


    /* HUMIDITY */

    humidity.textContent =
        `${Math.round(
            current.relative_humidity_2m
        )}%`;


    /* WIND */

    windSpeed.textContent =
        `${Math.round(
            current.wind_speed_10m
        )} km/h`;


    /* =====================================
       VISIBILITY
       Find the hourly value matching
       the current API time.
    ===================================== */

    let visibilityValue =
        data.hourly &&
        data.hourly.visibility
            ? data.hourly.visibility[0]
            : null;


    if (
        data.hourly &&
        data.hourly.time &&
        data.hourly.visibility &&
        current.time
    ) {

        const currentIndex =
            data.hourly.time.indexOf(
                current.time
            );

        if (
            currentIndex !== -1 &&
            data.hourly.visibility[currentIndex] !== undefined
        ) {

            visibilityValue =
                data.hourly.visibility[currentIndex];
        }
    }


    if (
        visibilityValue === undefined ||
        visibilityValue === null
    ) {

        visibility.textContent =
            "N/A";

    } else {

        visibility.textContent =
            `${(
                visibilityValue / 1000
            ).toFixed(1)} km`;
    }


    /* PRESSURE */

    pressure.textContent =
        `${Math.round(
            current.surface_pressure
        )} hPa`;
}


/* =========================================
   DISPLAY FORECAST
========================================= */

function displayForecast(data) {

    const daily =
        data.daily;

    forecastGrid.innerHTML =
        "";

    forecastLocation.textContent =
        "5-day forecast";


    for (
        let i = 0;
        i < daily.time.length;
        i++
    ) {

        const weather =
            getWeatherInfo(
                daily.weather_code[i]
            );


        /* CARD */

        const card =
            document.createElement(
                "article"
            );

        card.className =
            "forecast-card";


        /* DAY */

        const day =
            document.createElement(
                "span"
            );

        day.className =
            "forecast-day";

        day.textContent =
            i === 0
                ? "Today"
                : formatShortDay(
                    daily.time[i]
                );


        /* ICON */

        const icon =
            document.createElement(
                "span"
            );

        icon.className =
            "forecast-icon";

        icon.textContent =
            weather.icon;


        /* TEMPERATURE */

        const temperatureText =
            document.createElement(
                "div"
            );

        temperatureText.className =
            "forecast-temp";

        temperatureText.innerHTML =
            `${Math.round(
                daily.temperature_2m_max[i]
            )}°`;


        /* MINIMUM TEMPERATURE */

        const minimum =
            document.createElement(
                "span"
            );

        minimum.className =
            "forecast-min";

        minimum.textContent =
            `${Math.round(
                daily.temperature_2m_min[i]
            )}°`;


        temperatureText.appendChild(
            minimum
        );


        /* DESCRIPTION */

        const description =
            document.createElement(
                "p"
            );

        description.className =
            "forecast-description";

        description.textContent =
            weather.description;


        /* BUILD CARD */

        card.appendChild(
            day
        );

        card.appendChild(
            icon
        );

        card.appendChild(
            temperatureText
        );

        card.appendChild(
            description
        );


        forecastGrid.appendChild(
            card
        );
    }
}


/* =========================================
   SEARCH WEATHER
========================================= */

async function searchWeather(city) {

    const cleanCity =
        city.trim();


    /* EMPTY SEARCH */

    if (!cleanCity) {

        showError(
            "Please enter a city name."
        );

        cityInput.focus();

        return;
    }


    /* SHOW LOADING */

    showLoading();


    try {

        /* GET CITY COORDINATES */

        const location =
            await getCoordinates(
                cleanCity
            );


        /* GET WEATHER */

        const weatherData =
            await getWeather(
                location.latitude,
                location.longitude
            );


        /* SAVE STATE */

        currentLocation =
            location;

        currentWeatherData =
            weatherData;


        /* DISPLAY DATA */

        displayCurrentWeather(
            location,
            weatherData
        );

        displayForecast(
            weatherData
        );


        /* SAVE LAST CITY */

        localStorage.setItem(
            "weatherlyLastCity",
            location.name
        );


        /* LAST UPDATED */

        lastUpdated.textContent =
            formatTime();


        /* SHOW WEATHER */

        showWeatherContent();


    } catch (error) {

        console.error(
            "Weather error:",
            error
        );

        console.error(
            "Error message:",
            error.message
        );

        showError(
            error.message ||
            "Unable to fetch weather data. Please try again."
        );
    }
}


/* =========================================
   SEARCH FORM
========================================= */

searchForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        searchWeather(
            cityInput.value
        );
    }
);


/* =========================================
   REFRESH WEATHER
========================================= */

refreshButton.addEventListener(
    "click",
    () => {

        if (
            currentLocation
        ) {

            searchWeather(
                currentLocation.name
            );

        } else if (
            cityInput.value.trim()
        ) {

            searchWeather(
                cityInput.value
            );

        } else {

            showError(
                "Search for a city first."
            );
        }
    }
);


/* =========================================
   THEME
========================================= */

const THEME_KEY =
    "weatherlyTheme";


function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

        themeToggle.textContent =
            "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        themeToggle.textContent =
            "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


/* THEME TOGGLE */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );


        const darkMode =
            document.body.classList.contains(
                "dark-mode"
            );


        if (darkMode) {

            themeToggle.textContent =
                "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            localStorage.setItem(
                THEME_KEY,
                "dark"
            );

        } else {

            themeToggle.textContent =
                "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            localStorage.setItem(
                THEME_KEY,
                "light"
            );
        }
    }
);


/* =========================================
   LOAD LAST CITY
========================================= */

function loadLastCity() {

    const savedCity =
        localStorage.getItem(
            "weatherlyLastCity"
        );


    if (savedCity) {

        cityInput.value =
            savedCity;

        searchWeather(
            savedCity
        );
    }
}


/* =========================================
   INITIALIZE
========================================= */

loadTheme();

loadLastCity();
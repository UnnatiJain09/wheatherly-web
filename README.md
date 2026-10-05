# 🌦️ Weatherly — Modern Weather Dashboard

A modern, responsive weather application built with **HTML, CSS, and JavaScript**. Weatherly allows users to search for cities worldwide and view current weather conditions, atmospheric details, and a multi-day forecast through a clean and interactive dashboard.
## 🌐 Live Website
https://unnatijain09.github.io/wheatherly-web/



## 📸 Preview

<img width="749" height="468" alt="Screenshot 2026-10-05 205314" src="https://github.com/user-attachments/assets/d7e7840c-2536-4e7e-9850-4e3c91d00b2c" />
<img width="737" height="443" alt="Screenshot 2026-10-05 205323" src="https://github.com/user-attachments/assets/aeffed37-4c39-445d-a221-b2b75a504b45" />



## ✨ Features

* 🔍 **City Search** — Search for weather information for cities worldwide.
* 🌡️ **Current Weather** — View temperature, weather conditions, and feels-like temperature.
* 💧 **Weather Details** — Display humidity, wind speed, visibility, and atmospheric pressure.
* 📅 **Multi-Day Forecast** — View upcoming weather conditions in forecast cards.
* 🌐 **Live Weather Data** — Fetch real-time weather information using the Open-Meteo API.
* 🕐 **Local Time** — Display the selected city's local date and time using timezone information.
* 🌙 **Dark Mode** — Switch between light and dark themes.
* 🔄 **Refresh Weather** — Refresh the latest weather information.
* 💾 **Remember Last Search** — Restore the previously searched city using LocalStorage.
* ⚡ **Loading & Error States** — Provide feedback during API requests and failed searches.
* 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
* 🔑 **No API Key Required** — Uses Open-Meteo's public APIs without requiring an API key.

## 🛠️ Tech Stack

| Technology                   | Purpose                                             |
| ---------------------------- | --------------------------------------------------- |
| **HTML5**                    | Application structure and semantic markup           |
| **CSS3**                     | Styling, responsive layouts, animations, and themes |
| **JavaScript (ES6+)**        | Application logic and dynamic UI                    |
| **Fetch API**                | Asynchronous API requests                           |
| **Open-Meteo API**           | Weather forecast data                               |
| **Open-Meteo Geocoding API** | City search and coordinate lookup                   |
| **LocalStorage**             | Persisting preferences and last searched city       |

## 📁 Project Structure

```text
weather-app/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshot.png
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the Project

Open the project folder in **Visual Studio Code**.

### 3. Run the Application

Use the **Live Server** extension in VS Code to open `index.html`.

Alternatively, the project can be deployed using GitHub Pages, Vercel, or Netlify.

## 🌐 APIs Used

### Open-Meteo Weather API

Used to retrieve current weather conditions and forecast information.

[Open-Meteo](https://open-meteo.com/?utm_source=chatgpt.com)

### Open-Meteo Geocoding API

Used to search for cities and retrieve their geographical coordinates.

[Open-Meteo Geocoding API Documentation](https://open-meteo.com/en/docs/geocoding-api?utm_source=chatgpt.com)

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

* REST API integration
* JSON data handling
* `fetch()` and `async/await`
* Asynchronous JavaScript
* DOM manipulation
* Dynamic UI rendering
* API error handling
* Responsive web design
* CSS theme switching
* Browser LocalStorage
* Frontend project organization

## 🔮 Future Improvements

* 📍 Automatic weather detection using browser geolocation
* 📊 Hourly weather charts
* ⚠️ Weather alerts and severe-weather notifications
* 🌫️ Air quality information
* ⭐ Favorite cities and saved locations
* 📈 Extended weather analytics
* 🌅 Sunrise and sunset information


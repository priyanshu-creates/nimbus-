
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const settingsContainer = document.querySelector(".settings-container");
const forecastContainer = document.querySelector(".forecast-container"); 


console.log("DOM Elements:");
console.log("userContainer:", userContainer);
console.log("grantAccessContainer:", grantAccessContainer);
console.log("searchForm:", searchForm);
console.log("loadingScreen:", loadingScreen);
console.log("userInfoContainer:", userInfoContainer);
console.log("settingsContainer:", settingsContainer);
console.log("forecastContainer:", forecastContainer);


const weatherParticles = document.getElementById('weatherParticles');
const landingPage = document.getElementById('landingPage');
const getStartedBtn = document.getElementById('getStartedBtn');


const searchInput = document.querySelector("[data-searchInput]");
console.log("searchInput:", searchInput);


console.log("Dynamic Elements:");
console.log("weatherParticles:", weatherParticles);
console.log("landingPage:", landingPage);
console.log("getStartedBtn:", getStartedBtn);


let currentView = 'home'; 
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
let isLandingShown = !localStorage.getItem('hasVisited');


setupClickRippleEffect();
initializeLandingPage();


if (!isLandingShown) {
    getfromSessionStorage();
}

function switchView(newView) {
    currentView = newView;
    
    if(newView === 'search') {
        
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        settingsContainer.classList.remove("active");
        forecastContainer.classList.remove("active"); 
        searchForm.classList.add("active");
        
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    } else if(newView === 'home') {
        
        searchForm.classList.remove("active");
        settingsContainer.classList.remove("active");
        forecastContainer.classList.remove("active"); 
        
        getfromSessionStorage();
    } else if(newView === 'settings') {
        
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        forecastContainer.classList.remove("active"); 
        settingsContainer.classList.add("active");
    }
}




function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    
    grantAccessContainer.classList.remove("active");
    
    loadingScreen.classList.add("active");

    
    try {
        console.log("Fetching current weather for coordinates:", lat, lon);
        
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        console.log("Current weather response status:", currentResponse.status);
        const currentData = await currentResponse.json();
        console.log("Current weather data:", currentData);

        console.log("Fetching forecast for coordinates:", lat, lon);
        
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        console.log("Forecast response status:", forecastResponse.status);
        const forecastData = await forecastResponse.json();
        console.log("Forecast data:", forecastData);

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        forecastContainer.classList.add("active"); 
        renderWeatherInfo(currentData);
        renderForecastInfo(forecastData); 
    }
    catch(err) {
        console.error("Error fetching weather data:", err);
        loadingScreen.classList.remove("active");
        
        userInfoContainer.classList.add("active");
        forecastContainer.classList.add("active");
        const forecastCardsContainer = document.querySelector('[data-forecast-cards]');
        forecastCardsContainer.innerHTML = '<p class="error-message">Forecast currently unavailable. Please try again later.</p>';
    }

}

function renderWeatherInfo(weatherInfo) {
    

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

    
    sessionStorage.setItem('lastWeatherData', JSON.stringify(weatherInfo));
    

    
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/16x12/${weatherInfo?.sys?.country.toLowerCase()}.png`;//flagcdn.com/16x12/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    
    
    const iconCode = weatherInfo?.weather?.[0]?.icon;
    const mainWeather = weatherInfo?.weather?.[0]?.main; 
    
    
    const weatherIcons = {
        
        'clear': '<path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM21 11h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1zM6 12c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1zM6.76 4.84l-1.8-1.79c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.79 1.8c.39.39 1.02.39 1.41 0 .39-.39.39-1.03.01-1.42zM17.66 6.05c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-1.8 1.8c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.8zM12 22c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM6.05 17.66c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.8-1.79c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.8 1.79zM19.42 17.66l-1.8-1.79c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l1.8 1.79c.39.39.39 1.02 0 1.41-.39.39-1.03.39-1.41 0zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>',
        
        
        'clouds': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>',
        
        
        'rain': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM7 16l1.5 3L10 16H7zm3.5 0l1.5 3L13.5 16h-3zm3.5 0l1.5 3L17 16h-3z"/>',
        
        
        'thunderstorm': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM13 18l-4-5h3l-2-4 4 5h-3l2 4z"/>',
        
        
        'snow': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM8 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>',
        
        
        'mist': '<path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>',
        'fog': '<path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>',
        'haze': '<path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>'
    };
    
    
    let iconPath = weatherIcons['clear']; 
    const lowerMainWeather = mainWeather.toLowerCase();
    
    if (lowerMainWeather.includes('cloud')) {
        iconPath = weatherIcons['clouds'];
    } else if (lowerMainWeather.includes('rain') || lowerMainWeather.includes('drizzle')) {
        iconPath = weatherIcons['rain'];
    } else if (lowerMainWeather.includes('thunder')) {
        iconPath = weatherIcons['thunderstorm'];
    } else if (lowerMainWeather.includes('snow')) {
        iconPath = weatherIcons['snow'];
    } else if (lowerMainWeather.includes('mist') || lowerMainWeather.includes('fog') || lowerMainWeather.includes('haze')) {
        iconPath = weatherIcons['mist'];
    } else if (lowerMainWeather.includes('clear')) {
        iconPath = weatherIcons['clear'];
    }
    
    
    weatherIcon.innerHTML = iconPath;
    
    
    weatherIcon.classList.remove('sunny', 'cloudy', 'rainy');
    if (lowerMainWeather.includes('clear')) {
        weatherIcon.classList.add('sunny');
        createWeatherParticles('clear', 0);
    } else if (lowerMainWeather.includes('cloud')) {
        weatherIcon.classList.add('cloudy');
        createWeatherParticles('leaves', 20);
    } else if (lowerMainWeather.includes('rain')) {
        weatherIcon.classList.add('rainy');
        createWeatherParticles('rain', 80);
    } else if (lowerMainWeather.includes('snow')) {
        createWeatherParticles('snow', 60);
    } else {
        createWeatherParticles('clear', 0);
    }
    
    
    const tempCelsius = weatherInfo?.main?.temp;
    let displayTemp = Math.round(tempCelsius);
    let unitSymbol = '°C';
    
    if (currentUnit === 'fahrenheit') {
        displayTemp = Math.round((tempCelsius * 9/5) + 32);
        unitSymbol = '°F';
    }
    
    
    temp.classList.add('updating');
    animateCounter(temp, displayTemp, unitSymbol);
    
    
    const windSpeedValue = Math.round(weatherInfo?.wind?.speed * 3.6);
    const humidityValue = weatherInfo?.main?.humidity;
    const cloudinessValue = weatherInfo?.clouds?.all;
    
    animateCounter(windspeed, windSpeedValue, ' km/h', 800);
    animateCounter(humidity, humidityValue, '%', 900);
    animateCounter(cloudiness, cloudinessValue, '%', 1000);
    
    
    const humidityProgress = document.querySelector('[data-humidity-progress]');
    const cloudProgress = document.querySelector('[data-cloud-progress]');
    
    if (humidityProgress) {
        setTimeout(() => animateProgressBar(humidityProgress, humidityValue), 500);
    }
    if (cloudProgress) {
        setTimeout(() => animateProgressBar(cloudProgress, cloudinessValue), 700);
    }
    
    
    const windDirection = document.querySelector('[data-wind-direction]');
    if (windDirection && weatherInfo?.wind?.deg) {
        windDirection.style.transform = 'rotate(' + weatherInfo.wind.deg + 'deg)';
    }

    
    const weatherCard = document.querySelector('.main-weather');
    weatherCard.style.opacity = '0';
    weatherCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        weatherCard.style.transition = 'all 0.6s ease-out';
        weatherCard.style.opacity = '1';
        weatherCard.style.transform = 'translateY(0)';
    }, 100);
}


function renderForecastInfo(forecastData) {
    console.log("Rendering forecast data:", forecastData);
    
    const forecastCardsContainer = document.querySelector('[data-forecast-cards]');
    console.log("forecastCardsContainer:", forecastCardsContainer);
    
    
    sessionStorage.setItem('lastForecastData', JSON.stringify(forecastData));
    
    if (!forecastData || !forecastData.list) {
        console.log("No forecast data available");
        if (forecastCardsContainer) {
            forecastCardsContainer.innerHTML = '<p class="error-message">Forecast currently unavailable. Please try again later.</p>';
        }
        return;
    }
    
    
    const dailyForecasts = processForecastData(forecastData.list);
    console.log("Daily forecasts:", dailyForecasts);
    
    
    let forecastHTML = '';
    
    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        
        const weatherCondition = day.weather[0].main; 
        const iconPath = getWeatherIconPath(weatherCondition);
        
        
        let minTemp = Math.round(day.main.temp_min);
        let maxTemp = Math.round(day.main.temp_max);
        let unitSymbol = '°C';
        
        if (currentUnit === 'fahrenheit') {
            minTemp = Math.round((day.main.temp_min * 9/5) + 32);
            maxTemp = Math.round((day.main.temp_max * 9/5) + 32);
            unitSymbol = '°F';
        }
        
        forecastHTML += `
            <div class="forecast-card">
                <div class="forecast-day">${dayName}</div>
                <div class="forecast-date">${monthDay}</div>
                <svg class="forecast-icon" viewBox="0 0 24 24" fill="currentColor">
                    ${iconPath}
                </svg>
                <div class="forecast-temp">
                    <span class="forecast-temp-max">${maxTemp}${unitSymbol}</span>
                    <span class="forecast-temp-min">${minTemp}${unitSymbol}</span>
                </div>
                <div class="forecast-desc">${day.weather[0].description}</div>
            </div>
        `;
    });
    
    if (forecastCardsContainer) {
        forecastCardsContainer.innerHTML = forecastHTML;
    }
}


function processForecastData(forecastList) {
    console.log("Processing forecast list:", forecastList);
    const dailyData = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0]; 
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                dt: item.dt,
                main: {
                    temp_min: item.main.temp_min,
                    temp_max: item.main.temp_max
                },
                weather: item.weather,
                dt_txt: item.dt_txt
            };
        } else {
            
            dailyData[dateKey].main.temp_min = Math.min(dailyData[dateKey].main.temp_min, item.main.temp_min);
            dailyData[dateKey].main.temp_max = Math.max(dailyData[dateKey].main.temp_max, item.main.temp_max);
        }
    });
    
    console.log("Daily data object:", dailyData);
    
    
    const dailyForecasts = Object.values(dailyData);
    console.log("Daily forecasts array:", dailyForecasts);
    return dailyForecasts.slice(0, 5);
}


function getWeatherIconPath(condition) {
    const weatherIcons = {
        
        'clear': '<path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM21 11h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1zM6 12c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1zM6.76 4.84l-1.8-1.79c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l1.79 1.8c.39.39 1.02.39 1.41 0 .39-.39.39-1.03.01-1.42zM17.66 6.05c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0l-1.79 1.8c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.79-1.8zM12 22c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM6.05 17.66c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41l1.8-1.79c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-1.8 1.79zM19.42 17.66l-1.8-1.79c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l1.8 1.79c.39.39.39 1.02 0 1.41-.39.39-1.03.39-1.41 0zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>',
        
        
        'clouds': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96z"/>',
        
        
        'rain': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM7 16l1.5 3L10 16H7zm3.5 0l1.5 3L13.5 16h-3zm3.5 0l1.5 3L17 16h-3z"/>',
        
        
        'thunderstorm': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM13 18l-4-5h3l-2-4 4 5h-3l2 4z"/>',
        
        
        'snow': '<path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM8 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>',
        
        
        'mist': '<path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>',
        'fog': '<path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>',
        'haze': '<path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>'
    };
    
    
    let iconPath = weatherIcons['clear']; 
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('cloud')) {
        iconPath = weatherIcons['clouds'];
    } else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
        iconPath = weatherIcons['rain'];
    } else if (lowerCondition.includes('thunder')) {
        iconPath = weatherIcons['thunderstorm'];
    } else if (lowerCondition.includes('snow')) {
        iconPath = weatherIcons['snow'];
    } else if (lowerCondition.includes('mist') || lowerCondition.includes('fog') || lowerCondition.includes('haze')) {
        iconPath = weatherIcons['mist'];
    } else if (lowerCondition.includes('clear')) {
        iconPath = weatherIcons['clear'];
    }
    
    return iconPath;
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        
        console.error("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");
if (grantAccessButton) {
    grantAccessButton.addEventListener("click", getLocation);
} else {
    console.warn("Grant access button not found in the DOM.");
}


const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        
        navItems.forEach(navItem => navItem.classList.remove('active'));
        
        item.classList.add('active');
        
        
        const navType = item.getAttribute('data-nav');
        switchView(navType);
    });
});


const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;


const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    root.classList.add('light-mode');
    themeToggle.classList.add('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-mode');
        themeToggle.classList.toggle('light');
        
        
        const isLight = root.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
} else {
    console.warn("Theme toggle button not found in the DOM.");
}


const unitButtons = document.querySelectorAll('.unit-btn');
let currentUnit = localStorage.getItem('tempUnit') || 'celsius';


unitButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-unit') === currentUnit) {
        btn.classList.add('active');
    }
});

unitButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        unitButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentUnit = btn.getAttribute('data-unit');
        localStorage.setItem('tempUnit', currentUnit);
        
        
        if (userInfoContainer.classList.contains('active')) {
            const lastWeatherData = JSON.parse(sessionStorage.getItem('lastWeatherData') || '{}');
            if (lastWeatherData.main) {
                renderWeatherInfo(lastWeatherData);
            }
            
            
            const lastForecastData = JSON.parse(sessionStorage.getItem('lastForecastData') || '{}');
            if (lastForecastData.list) {
                renderForecastInfo(lastForecastData);
            }
        }
    });
});


if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let cityName = searchInput.value;
        console.log("Search submitted for city:", cityName);

        if(cityName === "")
            return;
        else 
            fetchSearchWeatherInfo(cityName);
    });
} else {
    console.warn("Search form or input not found in the DOM.");
}

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    forecastContainer.classList.remove("active"); 
    grantAccessContainer.classList.remove("active");

    try {
        console.log("Fetching current weather for city:", city);
        
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        console.log("Current weather response status:", currentResponse.status);
        const currentData = await currentResponse.json();
        console.log("Current weather data:", currentData);

        console.log("Fetching forecast for city:", city);
        
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        console.log("Forecast response status:", forecastResponse.status);
        const forecastData = await forecastResponse.json();
        console.log("Forecast data:", forecastData);

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        forecastContainer.classList.add("active"); 
        renderWeatherInfo(currentData);
        renderForecastInfo(forecastData); 
    }
    catch(err) {
        console.error("Error fetching weather data:", err);
        loadingScreen.classList.remove("active");
        
        userInfoContainer.classList.add("active");
        forecastContainer.classList.add("active");
        const forecastCardsContainer = document.querySelector('[data-forecast-cards]');
        forecastCardsContainer.innerHTML = '<p class="error-message">Forecast currently unavailable. Please try again later.</p>';
    }
}


function createWeatherParticles(weatherType, intensity = 50) {
    
    weatherParticles.innerHTML = '';
    
    if (!weatherType || weatherType === 'clear') return;
    
    
    const particleCount = Math.min(intensity / 2, 50);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `particle ${weatherType}`;
        
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        
        if (weatherType === 'rain') {
            particle.style.opacity = 0.6 + Math.random() * 0.4;
            particle.style.animationDuration = (1 + Math.random() * 1) + 's';
        } else if (weatherType === 'snow') {
            particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
            particle.style.animationDuration = (4 + Math.random() * 3) + 's';
        } else if (weatherType === 'leaves') {
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
        }
        
        weatherParticles.appendChild(particle);
        
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, parseFloat(particle.style.animationDuration) * 1000);
    }
}


function setupClickRippleEffect() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = (e.clientX - 25) + 'px';
        ripple.style.top = (e.clientY - 25) + 'px';
        ripple.style.width = ripple.style.height = '50px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}


function animateCounter(element, target, suffix = '', duration = 1000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 16);
}


function animateProgressBar(element, percentage) {
    element.style.setProperty('--progress-width', percentage + '%');
    element.style.width = '0%';
    
    setTimeout(() => {
        element.style.width = percentage + '%';
    }, 100);
}


function initializeLandingPage() {
    // Re-select the elements to ensure they exist
    const landingPage = document.getElementById('landingPage');
    const getStartedBtn = document.getElementById('getStartedBtn');
    
    if (!isLandingShown || !landingPage) {
        if (landingPage) {
            landingPage.classList.add('hidden');
        }
        return;
    }
    
    // Ensure the button exists before adding event listener
    if (getStartedBtn && landingPage) {
        // Remove any existing event listeners to prevent duplicates
        const newGetStartedBtn = getStartedBtn.cloneNode(true);
        getStartedBtn.parentNode.replaceChild(newGetStartedBtn, getStartedBtn);
        
        // Add the event listener
        newGetStartedBtn.addEventListener('click', () => {
            // Add click ripple effect
            const rect = newGetStartedBtn.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.left = (rect.left + rect.width / 2 - 25) + 'px';
            ripple.style.top = (rect.top + rect.height / 2 - 25) + 'px';
            ripple.style.width = ripple.style.height = '50px';
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Animate landing page exit
            landingPage.style.transform = 'translateY(-100%)';
            landingPage.style.opacity = '0';
            
            setTimeout(() => {
                landingPage.classList.add('hidden');
                landingPage.style.transform = '';
                landingPage.style.opacity = '';
                
                // Mark as visited and start main app
                localStorage.setItem('hasVisited', 'true');
                // Update the global variable
                window.isLandingShown = false;
                getfromSessionStorage();
            }, 800);
        });
    } else {
        console.error("Get Started button or landing page not found in the DOM");
        // Fallback: if button not found, hide landing page and show main content
        if (landingPage) {
            landingPage.classList.add('hidden');
        }
        window.isLandingShown = false;
        getfromSessionStorage();
    }
}

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Re-select the button in case there were timing issues
    const getStartedBtn = document.getElementById('getStartedBtn');
    const landingPage = document.getElementById('landingPage');
    
    if (getStartedBtn && landingPage) {
        // Remove any existing event listeners to prevent duplicates
        const newGetStartedBtn = getStartedBtn.cloneNode(true);
        getStartedBtn.parentNode.replaceChild(newGetStartedBtn, getStartedBtn);
        
        // Add the event listener
        newGetStartedBtn.addEventListener('click', () => {
            // Add click ripple effect
            const rect = newGetStartedBtn.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.left = (rect.left + rect.width / 2 - 25) + 'px';
            ripple.style.top = (rect.top + rect.height / 2 - 25) + 'px';
            ripple.style.width = ripple.style.height = '50px';
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Animate landing page exit
            landingPage.style.transform = 'translateY(-100%)';
            landingPage.style.opacity = '0';
            
            setTimeout(() => {
                landingPage.classList.add('hidden');
                landingPage.style.transform = '';
                landingPage.style.opacity = '';
                
                // Mark as visited and start main app
                localStorage.setItem('hasVisited', 'true');
                // Update the global variable
                isLandingShown = false;
                getfromSessionStorage();
            }, 800);
        });
    }
});

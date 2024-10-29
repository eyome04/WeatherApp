const apiKey = '513b6f610aa1584cbcf8f502b44d1b86';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidityValue'); 
const windElement = document.getElementById('windValue'); 
const loadingSpinner = document.getElementById('loadingSpinner');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        showError('Please enter a city name.');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    displayLoading(true);
    hideError();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = capitalize(data.weather[0].description);
            humidityElement.textContent = `${data.main.humidity}%`;
            windElement.textContent = `${data.wind.speed} m/s`;

            displayWeatherInfo(true);
        })
        .catch(error => {
            showError(error.message);
        })
        .finally(() => {
            displayLoading(false);
        });
}

function displayLoading(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
    weatherInfo.style.opacity = show ? 0 : 1;
}

function displayWeatherInfo(show) {
    weatherInfo.style.opacity = show ? 1 : 0;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    displayWeatherInfo(false);
}

function hideError() {
    errorMessage.style.display = 'none';
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

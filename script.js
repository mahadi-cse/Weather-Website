const weatherForm = document.getElementById('weatherForm');
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const weatherIcon = document.getElementById('weatherIcon');
const locationName = document.getElementById('locationName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');

const geoApiKey = 'f3b91c4aba59fd13f3f6afb96e7001b2'; // Replace with your Geocoding API key
const weatherApiKey = 'f3b91c4aba59fd13f3f6afb96e7001b2'; // Replace with your Weather API key

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${geoApiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon, name } = data[0];
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`)
                        .then(response => response.json())
                        .then(weatherData => {
                            const { main, weather } = weatherData;
                            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
                            weatherIcon.src = icon;
                            weatherIcon.style.display = 'inline';
                            locationName.textContent = name;
                            temperature.textContent = main.temp.toFixed(2);
                            weatherDescription.textContent = weather[0].description;
                        })
                        .catch(error => console.error('Weather API error:', error));
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => console.error('Geocoding API error:', error));
    } else {
        alert('Please enter a location');
    }
});
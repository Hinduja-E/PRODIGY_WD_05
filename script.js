document.getElementById("btn").addEventListener("click", function () {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const apiKey = "171e009cae7e126fcbcec49c3a5cee6a"; // Your API key here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Use 'metric' units for Celsius

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.cod === "404") {
        document.getElementById("result").innerHTML =
          "City not found. Please try again.";
        return;
      }
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").innerHTML =
        "An error occurred while fetching weather data.";
    });
}

function displayWeather(data) {
  const result = document.getElementById("result");
  result.innerHTML = `
        <h2 style="font-family: 'Alkatra', serif;">Weather of ${data.name}</h2>
        <h4>Temperature: ${data.main.temp}\u00B0 C</h4>
        <h4>Feels like: ${data.main.feels_like}\u00B0 C</h4>
        <h4>Humidity: ${data.main.humidity} %</h4>
        <h4>Pressure: ${data.main.pressure} hPa</h4>
        <h4>Wind speed: ${data.wind.speed} m/s</h4>
        <h4>Wind direction: ${data.wind.deg} degrees</h4>
    `;
}

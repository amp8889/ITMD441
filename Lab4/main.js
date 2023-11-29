document.addEventListener('DOMContentLoaded', () => {
    const locationsDropdown = document.getElementById('locations');
    const currentLocationLabel = document.getElementById('currentLocation');
    const outputSunrise = document.getElementById('outputSunrise');
    const outputSunset = document.getElementById('outputSunset');
    const outputCivilDawn = document.getElementById('outputCivilDawn');
    const outputCivilDusk = document.getElementById('outputCivilDusk');
    const outputDayLength = document.getElementById('outputDayLength');
    const outputSolarNoon = document.getElementById('outputSolarNoon');
    const outputTimeZone = document.getElementById('outputTimeZone');

    locationsDropdown.addEventListener('change', () => {
      const selectedLocation = locationsDropdown.value.split(',');
      const latitude = selectedLocation[0];
      const longitude = selectedLocation[1];
  
      currentLocationLabel.innerHTML = `Current Location: ${locationsDropdown.options[locationsDropdown.selectedIndex].text}`;
      const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`; // For today's data
  
      fetchSunriseSunset(url);
    });
  
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          currentLocationLabel.innerHTML = `Current Location: Your Location`;
          const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`; // For today's data
  
          fetchSunriseSunset(url);
        }, error => {
          outputSunrise.innerHTML = `Error getting location: ${error.message}`;
        });
      } else {
        outputSunrise.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  
    function fetchSunriseSunset(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const results = data.results;
          const timezone = data.timezone;
  
          outputSunrise.innerHTML = `Sunrise: ${results.sunrise}`;
          outputSunset.innerHTML = `Sunset: ${results.sunset}`;
          outputCivilDawn.innerHTML = `Civil Dawn: ${results.civil_twilight_begin}`;
          outputCivilDusk.innerHTML = `Civil Dusk: ${results.civil_twilight_end}`;
          outputDayLength.innerHTML = `Day Length: ${results.day_length}`;
          outputSolarNoon.innerHTML = `Solar Noon: ${results.solar_noon}`;
          outputTimeZone.innerHTML = `Time Zone: ${timezone}`;
        })
        .catch(error => {
          outputSunrise.innerHTML = `Error: ${error}`;
        });
    }
  
    getUserLocation();
  });

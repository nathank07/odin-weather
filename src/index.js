import './style.css';

const key = '234b0119759ae917a685a9cb05975a39';
const location = prompt('Location');
const fLocations = ['US', 'LR', 'MY']; // Countries with fahrenheit
const body = document.querySelector('body');
const locationDiv = document.createElement('div');
const temperature = document.createElement('div');

function getTemps(location) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`)
    .then(async (response) => {
      if (Array.from(new Array(100), (x, i) => i + 400).includes(response.status)) {
        if (response.status === 400 || response.status === 404) {
          alert('Could not find search');
        } else {
          alert(`API error: ${response.status}`);
        }
      } else {
        const data = await response.json();
        let temp = Number(data.main.temp - 271.15);
        let indicator = '°C';
        if (fLocations.includes(data.sys.country)) {
          temp = Number((temp * 1.8) + 32);
          indicator = '°F';
        }
        temperature.innerHTML = `${Math.round(temp)} ${indicator}`;
        locationDiv.innerHTML = `${data.name}, ${data.sys.country}: `;
      }
    });
}

getTemps(location);
body.appendChild(locationDiv);
body.appendChild(temperature);

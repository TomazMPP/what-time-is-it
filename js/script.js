const mainMessagePage = document.getElementById('mainMessage');
const weatherBH = document.getElementById('weatherBH');
const timeBH = document.getElementById('timeBH');
const weatherOslo = document.getElementById('weatherOslo');
const timeOslo = document.getElementById('timeOslo');
const img = document.getElementById('sun')
const userDate = new Date();
const timezone = userDate.getHours();

const dateOslo = userDate.toLocaleString("en-US", {hour: '2-digit',   hour12: false, timeZone: "Europe/Oslo"});
const dateBeloHorizonte = userDate.toLocaleString("en-US", {hour: '2-digit',   hour12: false, timeZone: "America/Sao_Paulo"});
const minutes = userDate.getMinutes();

const apiOslo = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Oslo?unitGroup=metric&key=QG8JA7KU2KNDPCF2VAJXXRS4H&contentType=json`;
const apiBH = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/belo%20horizonte?unitGroup=metric&key=QG8JA7KU2KNDPCF2VAJXXRS4H&contentType=json`;

function time() {

    mainMessagePage.innerHTML = 'Good Morning!';
    if (dateOslo <= 12) {
        mainMessagePage.innerHTML = 'Good Morning!';
        document.body.style.background = "linear-gradient(to bottom, #87CEEB, #FEEB8E)";
        img.src = '../img/sun.png'
    } else if (dateOslo <= 18) {
        mainMessagePage.innerHTML = 'Good Afternoon!';
        document.body.style.background = "linear-gradient(#D4145A, #FBB03B)";
        img.src = '../img/sun.png'
    } else {
        mainMessagePage.innerHTML = 'Good Evening!';
        document.body.style.background = "linear-gradient(#333333, rgb(136, 132, 132))";
        img.src = '../img/moon.png'
    }

    timeBH.innerHTML = `${dateBeloHorizonte}:${formatMinutes(userDate.getMinutes())}`;
    timeOslo.innerHTML = `${dateOslo}:${formatMinutes(userDate.getMinutes())}`;


    fetch(apiOslo)
  .then(response => response.json())
  .then(dataOslo => {
    const rain = dataOslo.currentConditions.precip
    const snow = dataOslo.currentConditions.snow
    const temperatureOslo = dataOslo.currentConditions.temp;    
    const tempFahrenheitOslo = (temperatureOslo * 9/5) + 32;
    weatherOslo.innerHTML = `${temperatureOslo} °C | ${tempFahrenheitOslo} °F`;

    if (snow >= 5) {
        const snowElement = document.createElement('div');
        snowElement.id = 'snowid';
        snowElement.className = 'snow';
        document.body.appendChild(snowElement);
        img.src = '../img/snow.png'
      }

      if (rain >= 1) {
        const rainContainer = document.querySelector('.rain');
        const numDrops = 100; 

        if (rainContainer) {
            for (let i = 0; i < numDrops; i++) {
                const rainDrop = document.createElement('div');
                rainDrop.classList.add('rain-drop');
                rainDrop.style.left = `${getRandomNumber(0, 100)}vw`;
                rainDrop.style.animationDuration = `${getRandomNumber(1, 3)}s`;
                rainContainer.appendChild(rainDrop);
            }
        } else {
            const rainElement = document.createElement('div');
            rainElement.className = 'rain';
            document.body.appendChild(rainElement);

            for (let i = 0; i < numDrops; i++) {
                const rainDrop = document.createElement('div');
                rainDrop.classList.add('rain-drop');
                rainDrop.style.left = `${getRandomNumber(0, 100)}vw`;
                rainDrop.style.animationDuration = `${getRandomNumber(1, 3)}s`;
                rainElement.appendChild(rainDrop);
            }
        }
    }
});

};

fetch(apiBH)
.then(response => response.json())
.then(dataBH => {
  const temperatureBH = dataBH.currentConditions.temp;    
  const tempFahrenheitBH = (temperatureBH * 9/5) + 32;
  weatherBH.innerHTML = `${temperatureBH} °C | ${tempFahrenheitBH} °F`;
});

const button = document.getElementById('userclick');

button.addEventListener('click', function() {
    userTimezone();
});

function userTimezone() {
    mainMessagePage.innerHTML = 'Good Morning!';
    if (timezone <= 12) {
        mainMessagePage.innerHTML = 'Good Morning!';
        document.body.style.background = "linear-gradient(to bottom, #87CEEB, #FEEB8E)";
        img.src = '../img/sun.png';
    } else if (timezone <= 18) {
        mainMessagePage.innerHTML = 'Good Afternoon!';
        document.body.style.background = "linear-gradient(#D4145A, #FBB03B)";
        img.src = '../img/sun.png';
    } else {
        mainMessagePage.innerHTML = 'Good Evening!';
        document.body.style.background = "linear-gradient(#333333, rgb(136, 132, 132))";
        img.src = '../img/moon.png';
    }
    
    button.addEventListener('click', function() {
        var usertime = document.getElementById('timeuser');
        usertime.innerHTML = `Your time right now is ${timezone}:${formatMinutes(userDate.getMinutes())}`;
    });

}

window.addEventListener('DOMContentLoaded', () => {
    userTimezone();
    time();
});

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function formatMinutes(minutes) {
    return minutes < 10 ? `0${minutes}` : minutes;
}
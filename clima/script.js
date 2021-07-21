
document.querySelector('.busca').addEventListener('submit', async (event) =>{
  event.preventDefault(event);
    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
    clearInfo();
    showWarning('Buscando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=fc81b71b79a963231055465a90488f7e&units=metric&lang=pt_br`;
    let results = await fetch(url);
    let resultsJson = await results.json();

    if(resultsJson.cod === 200) {
      showInfo({
        name: resultsJson.name,
        country: resultsJson.sys.country,
        temp: resultsJson.main.temp,
        tempIcon: resultsJson.weather[0].icon,
        windSpeed: resultsJson.wind.speed,
        windAngle: resultsJson.wind.deg
      });
    }else {
      clearInfo();
      showWarning('Não encontramos essa localização.');
    }
  }
});

function showInfo(resultsJson) {
  showWarning('');
  document.querySelector('.titulo').innerHTML = `${resultsJson.name}, ${resultsJson.country}`;
  document.querySelector('.tempInfo').innerHTML = `${resultsJson.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${resultsJson.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${resultsJson.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${resultsJson.windAngle - 90}deg)`;
  document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}
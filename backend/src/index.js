// TODO: remove this and handle from docker env vars
require('dotenv').config();
const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  console.log('fetchWeather');
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchForecast = async (lat, lon) => {
  if (lat && lon) {
    console.log('defined');
    const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&cnt=5`;
    const response = await fetch(endpoint);
    return response.json();
  } else {
    const endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&cnt=5`;
    const response = await fetch(endpoint);
    return response.json();
  }
};

router.get('/api/weather', async (ctx) => {
  console.log('Api /weather called');
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
})
  .get('/api/forecast', async ctx => {
    console.log('API /api/forecast called  ');
    const forecastData = await fetchForecast();

    console.log('Count: ', forecastData.list.length);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = forecastData.list ? forecastData.list : {};
  })
  .get('/api/forecast/:lat/:lon', async ctx => {
    console.log(`API /forecast called with ${ctx.params.lat} and ${ctx.params.lon}`);
    const forecastData = await fetchForecast(ctx.params.lat, ctx.params.lon);

    console.log('Count: ', forecastData.list.length);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = forecastData.list ? forecastData.list : {};
  })
// Mock endpoint for Robot tests
  .get('/robotapi/weather', async ctx => {
    // Always send the same response for testing
    // This way we can be sure that the RF tests always
    // get the same data from the endpoint.
    const weatherData = {
      icon: '01n.svg',
    };

    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData;
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);

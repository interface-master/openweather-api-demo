const express = require('express');
const axios = require('axios');

const app = express();

const OPENWEATHERAPI_ROOT = 'https://api.openweathermap.org/data/2.5/';
const OPENWEATHERAPI_WEATHER = OPENWEATHERAPI_ROOT + 'weather';
const OPENWEATHERAPI_FORECAST = OPENWEATHERAPI_ROOT + 'forecast';

const UNITS = 'metric';

const APPID = process.env.OPENWEATHERAPI_APPID;

// Use static files
app.use('/', express.static(__dirname + '/dist'));

// Will serve up compiled React UI
app.get('/', async (req, res) => {
    console.info(`Serving up React UI.`);
    res.sendFile(__dirname + '/dist/index.html')
});

// Will pull WEATHER data from OpenWeather API
app.get('/weather', async (req, res) => {
    // validate input
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        console.error('Error on /weather endpoint - missing input arguments lat, lon', lat, lon);
        res.status(500).send('Must provide lat and lon arguments.');
        return;
    }
    // fetch data
    const finalURL = `${OPENWEATHERAPI_WEATHER}?lat=${lat}&lon=${lon}`;
    const [data, error] = await fetchFromOpenWeather(finalURL);
    if (error) {
        console.error('Error fetching from OpenWeather:', error);
        res.status(500).send('Error fetching weather.');
        return;
    }
    console.info(`Serving up ${JSON.stringify(data).length} bytes of weather.`);
    res.status(200).json(data);
});

// Will pull FORECAST data from OpenWeather API
app.get('/forecast', async (req, res) => {
    // validate input
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        console.error('Error on /forecast endpoint - missing input arguments lat, lon', lat, lon);
        res.status(500).send('Must provide lat and lon arguments.');
        return;
    }
    // fetch data
    const finalURL = `${OPENWEATHERAPI_FORECAST}?lat=${lat}&lon=${lon}`;
    const [data, error] = await fetchFromOpenWeather(finalURL);
    if (error) {
        console.error('Error fetching from OpenWeather:', error);
        res.status(500).send('Error fetching forecast.');
        return;
    }
    console.info(`Serving up ${JSON.stringify(data).length} bytes of forecast.`);
    res.status(200).json(data);
});

// Utility functions
const fetchFromOpenWeather = async (url) => {
    let data, error;
    if (APPID) {
        try {
            const full_url = `${url}&units=${UNITS}&appid=${APPID}`;
            const response = await axios.get(full_url);
            data = response.data;
        } catch (e) {
            error = e;
        }
    } else {
        error = 'Must provide OPENWEATHERAPI_APPID in environment variable.';
    }
    return [data, error];
}

// export for Jest
module.exports = app;
const express = require('express');
const axios = require('axios');

const app = express();

const OPENWEATHERAPI_ROOT = 'https://api.openweathermap.org/data/2.5/';
const OPENWEATHERAPI_WEATHER = OPENWEATHERAPI_ROOT + 'weather';
const OPENWEATHERAPI_FORECAST = OPENWEATHERAPI_ROOT + 'forecast';

const APPID = process.env.OPENWEATHERAPI_APPID;

// Will serve up compiled React UI
app.get('/', async (req, res) => {
    console.info(`Serving up React UI.`);
    res.sendFile(__dirname + '/frontend/dist/index.html')
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
    const [data, error] = await fetchFromOpenWeather(OPENWEATHERAPI_WEATHER);
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
    const [data, error] = await fetchFromOpenWeather(OPENWEATHERAPI_FORECAST);
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
            const full_url = `${url}?lat=0&lon=0&appid=${APPID}`;
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
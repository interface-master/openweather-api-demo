const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.port || 3000;

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
    const [data, error] = await fetchFromOpenWeather(OPENWEATHERAPI_WEATHER);
    if (error) {
        res.status(500).send('Error fetching weather.');
    }
    console.info(`Serving up ${JSON.stringify(data).length} bytes of weather.`);
    res.status(200).json(data);
});

// Will pull FORECAST data from OpenWeather API
app.get('/forecast', async (req, res) => {
    const [data, error] = await fetchFromOpenWeather(OPENWEATHERAPI_FORECAST);
    if (error) {
        res.status(500).send('Error fetching forecast.');
    }
    console.info(`Serving up ${JSON.stringify(data).length} bytes of forecast.`);
    res.status(200).json(data);
});

// Listening is one of the loudest forms of kindness
app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
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
            console.error('Error fetching from OpenWeather:', e);
            error = e;
        }
    } else {
        error = 'Must provide OPENWEATHERAPI_APPID in environment variable.';
        console.error(error);
    }
    return [data, error];
}
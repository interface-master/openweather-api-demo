import express, { Express, Request, Response } from 'express';
import axios from 'axios';

const app: Express = express();

const OPENWEATHERAPI_ROOT = 'https://api.openweathermap.org/data/2.5/';
const OPENWEATHERAPI_WEATHER = OPENWEATHERAPI_ROOT + 'weather';
const OPENWEATHERAPI_FORECAST = OPENWEATHERAPI_ROOT + 'forecast';

const UNITS = 'metric';

const APPID = process.env.OPENWEATHERAPI_APPID;

// Cache API calls to improve performance
import NodeCache from 'node-cache';
const weatherCache = new NodeCache({
    stdTTL: 1800, // 30 minute cache
});

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
    // build URL and use it as the key for caching
    const finalURL = `${OPENWEATHERAPI_WEATHER}?lat=${lat}&lon=${lon}`;
    // check cache
    const cacheValue = weatherCache.get(finalURL);
    if (!cacheValue) {
        // fetch data
        const [data, error] = await fetchFromOpenWeather(finalURL);
        if (error) {
            console.error('Error fetching from OpenWeather:', error);
            res.status(500).send('Error fetching weather.');
            return;
        } else {
            weatherCache.set(finalURL, data); // cache result
        }
        console.info(`Serving up ${JSON.stringify(data).length} bytes of weather.`);
        res.status(200).json(data);
    } else {
        console.info(`Serving up ${JSON.stringify(cacheValue).length} bytes of weather from the cache.`);
        res.status(200).json(cacheValue);
    }
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
    // build URL and use it as the key for caching
    const finalURL = `${OPENWEATHERAPI_FORECAST}?lat=${lat}&lon=${lon}`;
    // check cache
    const cacheValue = weatherCache.get(finalURL);
    if (!cacheValue) {
        // fetch data
        const [data, error] = await fetchFromOpenWeather(finalURL);
        if (error) {
            console.error('Error fetching from OpenWeather:', error);
            res.status(500).send('Error fetching forecast.');
            return;
        } else {
            weatherCache.set(finalURL, data); // cache result
        }
        console.info(`Serving up ${JSON.stringify(data).length} bytes of forecast.`);
        res.status(200).json(data);
    } else {
        console.info(`Serving up ${JSON.stringify(cacheValue).length} bytes of forecast from the cache.`);
        res.status(200).json(cacheValue);
    }
});

// Utility functions
const fetchFromOpenWeather = async (url: string) => {
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
export default app;
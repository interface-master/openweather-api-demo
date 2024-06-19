import express from 'express';
import fs from 'fs';
import { preprocessForecast, preprocessWeather } from './server.utils';

const port = 3000;
const app = express();

const mockWeatherDataPath = __dirname + '/__mocks/mockWeatherData.json';
const mockForecastDataPath = __dirname + '/__mocks/mockForecastData.json';

// Use static files
app.use('/', express.static(__dirname + '/dist'));

// Serve up mock Weather and Forecast data
app.get('/weather', async (req, res) => {
    // v1 - send the file
    // console.info(`${(new Date()).toISOString()}: Serving up mock weather data.`);
    // res.sendFile(__dirname + '/__mocks/mockWeatherData.json');
    // v2 - preprocess the file
    const mockWeatherData = fs.readFileSync(mockWeatherDataPath, 'utf8');
    const mockWeatherJson = JSON.parse(mockWeatherData);
    console.info(`${(new Date()).toISOString()}: Preprocessing weather data.`);
    const preprocessedData = preprocessWeather(mockWeatherJson);
    console.info(`${(new Date()).toISOString()}: Serving up mock weather data.`);
    res.status(200).json(preprocessedData);
});

app.get('/forecast', async (req, res) => {
    // v1 - send the file
    // console.info(`${(new Date()).toISOString()}: Serving up mock forecast data.`);
    // res.sendFile(__dirname + '/__mocks/mockForecastData.json');
    // v2 - preprocess the file
    const mockForecastData = fs.readFileSync(mockForecastDataPath, 'utf8');
    const mockForecastJson = JSON.parse(mockForecastData);
    console.info(`${(new Date()).toISOString()}: Preprocessing forecast data.`);
    const preprocessedData = preprocessForecast(mockForecastJson);
    console.info(`${(new Date()).toISOString()}: Serving up mock forecast data.`);
    res.status(200).json(preprocessedData);
});

app.listen(port, () => {
    console.info(`${(new Date()).toISOString()}: Mock server listening on port ${port}`);
});
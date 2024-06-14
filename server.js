const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const OPENWEATHERAPI_ROOT = 'https://api.openweathermap.org/data/2.5/';
const OPENWEATHERAPI_WEATHER = OPENWEATHERAPI_ROOT + 'weather';
const OPENWEATHERAPI_FORECAST = OPENWEATHERAPI_ROOT + 'forecast';

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/frontend/dist/index.html')
});

app.get('/weather', async (req, res) => {
    res.status(200).send('Here is some weather...');
});

app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
});

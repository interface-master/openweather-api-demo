const express = require('express');

const port = 3000;
const app = express();

// Use static files
app.use('/', express.static(__dirname + '/dist'));

// Serve up mock Weather and Forecast data
app.get('/weather', async (req, res) => {
    console.info(`Serving up mock weather data.`);
    res.sendFile(__dirname + '/__mocks/mockWeatherData.json');
});

app.get('/forecast', async (req, res) => {
    console.info(`Serving up mock forecast data.`);
    res.sendFile(__dirname + '/__mocks/mockForecastData.json');
});

app.listen(port, () => {
    console.info(`Mock server listening on port ${port}`);
});
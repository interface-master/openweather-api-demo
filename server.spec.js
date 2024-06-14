const app = require('./server.js');
const mockForecastData = require('./__mocks/mockForecastData.json');
const mockWeatherData = require('./__mocks/mockWeatherData.json');

const axios = require('axios');
const jsdom = require('jsdom');
const sinon = require('sinon');
const request = require('supertest');

// enable Jest to start and stop the server

let server;

beforeAll(() => {
    server = app.listen(12345);
})

afterAll(() => {
    server.close();
});

// TESTS

describe('GET / endpoint', () => {
    it('should serve the static files', async () => {
        const response = await request(app).get('/');
        const responseText = await response.text;
        const dom = new jsdom.JSDOM(responseText);
        const title = dom.window.document.querySelector('title').textContent;

        expect(response.statusCode).toBe(200);
        expect(title).toBe('OpenWeather API Demo Project');
    });
});

describe('GET /weather endpoint', () => {
    beforeEach(() => {
        // enable mocking of calls to OpenWeather
        sandbox = sinon.createSandbox();
        sandbox.stub(axios, 'get').resolves({ data: mockWeatherData });
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should return weather data', async () => {
        const response = await request(app).get('/weather');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /forecast endpoint', () => {
    beforeEach(() => {
        // enable mocking of calls to OpenWeather
        sandbox = sinon.createSandbox();
        sandbox.stub(axios, 'get').resolves({ data: mockForecastData });
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should return forecast data', async () => {
        const response = await request(app).get('/forecast');
        expect(response.statusCode).toBe(200);
    });
});

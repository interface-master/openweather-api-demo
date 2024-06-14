const app = require('./server.js');

// mocks
const mockForecastData = require('./__mocks/mockForecastData.json');
const mockWeatherData = require('./__mocks/mockWeatherData.json');

const mockLat = 1;
const mockLon = 2;
const mockAppId = 3;

// dependencies
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
    const properURL = `/weather?lat=${mockLat}&lon=${mockLon}`;
    const improperURL_missingLat = `/weather?lon=${mockLon}`;
    const improperURL_missingLon = `/weather?lat=${mockLat}`;

    beforeEach(() => {
        // enable mocking of calls to OpenWeather
        sandbox = sinon.createSandbox();
        sandbox.stub(axios, 'get').resolves({ data: mockWeatherData });
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should return weather data mock for proper URL', async () => {
        const response = await request(app).get(properURL);
        expect(response.statusCode).toBe(200);
    });

    it('should fail if the request is missing `lat` prop', async () => {
        const response = await request(app).get(improperURL_missingLat);
        expect(response.statusCode).toBe(500);
    });

    it('should fail if the request is missing `lon` prop', async () => {
        const response = await request(app).get(improperURL_missingLon);
        expect(response.statusCode).toBe(500);
    });
});

describe('GET /forecast endpoint', () => {
    const properURL = `/forecast?lat=${mockLat}&lon=${mockLon}`;
    const improperURL_missingLat = `/forecast?lon=${mockLon}`;
    const improperURL_missingLon = `/forecast?lat=${mockLat}`;

    beforeEach(() => {
        // enable mocking of calls to OpenWeather
        sandbox = sinon.createSandbox();
        sandbox.stub(axios, 'get').resolves({ data: mockForecastData });
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should return forecast data mock', async () => {
        const response = await request(app).get(properURL);
        expect(response.statusCode).toBe(200);
    });

    it('should fail if the request is missing `lat` prop', async () => {
        const response = await request(app).get(improperURL_missingLat);
        expect(response.statusCode).toBe(500);
    });

    it('should fail if the request is missing `lon` prop', async () => {
        const response = await request(app).get(improperURL_missingLon);
        expect(response.statusCode).toBe(500);
    });
});

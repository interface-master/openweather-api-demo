// hack to fix TextEncoder and TextDecoder not defined
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

// dependencies
import axios from 'axios';
import jsdom from 'jsdom';
import sinon from 'ts-sinon';
import request from 'supertest';

// types
import { Server } from 'http';

// app
import app from './server';

// mocks
const mockForecastData = require('./__mocks/mockForecastData.json');
const mockWeatherData = require('./__mocks/mockWeatherData.json');

const mockLat = 1;
const mockLon = 2;
const mockAppId = 3;


// enable Jest to start and stop the server

let server:Server;

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
        const title = dom?.window?.document?.querySelector('title')?.textContent;

        expect(response.statusCode).toBe(200);
        expect(title).toBe('OpenWeather API Demo Project');
    });
});

let sandbox: sinon.SinonSandbox;

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

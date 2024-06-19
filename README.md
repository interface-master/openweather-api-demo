# openweather-api-demo

A demo application for communicating with OpenWeather API.

The front-end UI is built on React, while the back-end server is build on Express. Both projects use TypeScript for consistency and type safety. The front-end communicates with the back-end server without any authentication, because it is assumed the two projects would be deployed to the cloud either on the same container, or in separate containers on the same VPC. The back-end server uses the OpenWeather API Key to communicate with the API and return the responses back to the front-end.


# How to run

Make sure to first export the OpenWeather API Key as an environment variable
```
export OPENWEATHERAPI_APPID="...";
```

You can build a docker container from the source by running
```
docker build -t openweather --build-arg API_KEY=$OPENWEATHERAPI_APPID .
```

Then running the container with
```
docker run -p 3000:3000 openweather
```

# How to dev

In order to run the project on your localhost for development purposes, first set the OpenWeather API key as an environment variable
```
export OPENWEATHERAPI_APPID="...";  
```

Then to use Webpack dev server use
```
npm run dev
```

To build the React project into a `/dist` folder use
```
npm run build
```

To run the Express sever that serves the React UI from the `/dist` folder and exposes the `/weather` and `/forecast` endpoints that talk to the OpenWeather API use
```
npm run serve
```

You can also build and run the server in one command
```
npm run buildandserve
```

To test the React project run
```
npm run test:fe
```

To test the Express server run
```
npm run test:be
```

To run all the tests use
```
npm run test
```

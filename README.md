# openweather-api-demo

A demo application for communicating with OpenWeather API.

The front-end UI is built on React, while the back-end server is built on Express. Both projects use TypeScript for consistency and type safety. The front-end communicates with the back-end server without any authentication, because it is assumed the two projects would be deployed to the cloud either on the same container, or in separate containers on the same VPC. The back-end server uses the OpenWeather API Key to communicate with the API and return the responses back to the front-end.

This architecture is illustrated here:

```
[ WEB UI  ]
[ - - - - ]
[ React   ]
     |
 ( fetch )
     |
     |
     |
[ SERVICE       ]-( 🔑 )-----( 🔐 )-[ OPENWEATHER API ]
[ - - - - - - - ]                  [ - - - - - - - - ]
[ GET /weather  ]                  [ GET /weather    ]
[ GET /forecast ]                  [ GET /forecast   ]
```

The Web UI is responsible for displaying the data that is returned by the Service. For this reason the UI is built to simply accept the data and display it as-is without any processing.

We considered instead to push all the processing from the Service to the Web UI to save compute costs, at the expense of egress, however it seemed that the reduction in payload size was significant enough, and the processing seemed to be minimal, that we opted for the current implementation. We were able to reduce the `/weather` payloads by an average of 73%, while the `/forecast` payloads by 95%. On the other hand the processing involves looping over the given JSON and summarizing it as well as stripping away unnecessary data. It wasn't precisely measured but the assumption is that the cost of this processing is insignificant. This assumption could later be tested to confirm or reject the hypothesis.

Sample reduction analysis:

| Original | Compressed | % Reduction |
| -------: | ---------: | ----------: |
|      480 |        125 |       73.95 |
|      469 |        130 |       72.28 |
|      482 |        130 |       73.02 |
|      478 |        132 |       72.38 |
|      517 |        127 |       75.43 |
|    16247 |        787 |       95.15 |
|    16123 |        804 |       95.01 |
|    16031 |        813 |       94.92 |
|    16350 |        796 |       95.13 |
|    15845 |        795 |       94.98 |

The preprocessing that the Service performs is stripping away unnecessary data that is currently not being used by the UI, and summarizing the forecast data into a single day display - since that is what the UI displays. When the UI requires new data points, or more detail into the forecast view we can update what the Service returns.

The service has two endpoints - `/weather` and `/forecast` which require `lat` and `lon` arguments and map to the same endpoints on the OpenWeather API. The Service takes care of adding the `appid` to the request and hides the API key from the user.



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

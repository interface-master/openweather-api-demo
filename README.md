# OpenWeather API Demo

A demo application for communicating with the OpenWeather API.


## Requirements

The requirements are simple - write an app that gives you the weather for a searchable city. The results should display the current weather and the forecast for the next 5 days. There should also be a polling feature that fetches fresh data every 10 minutes.

We will use the OpenWeather API, which can give the current and forecast weather for any city given the latitude and longitude. We will allow the user to search for any city and given the lat/lon of that city we can retrieve and display the weather information. 


## Details

The front-end UI is built on React, while the back-end server is built on Express. Both projects use TypeScript for consistency and type safety. The front-end communicates with the back-end server without any authentication, because it is assumed the two projects would be deployed to the cloud either on the same container (as in this demo), or in separate containers on the same VPC. The back-end server uses the OpenWeather API Key to communicate with the API and after some processing returns the responses back to the front-end.

This architecture is illustrated here:

```
┌─────────┐
│ WEB UI  │
│ ┄┄┄┄┄┄┄ │
│ React   │
└────┬────┘
     │
 ( fetch )
     │
     │
     │        🔑                    🔐
┌────┴──────────┐                  ┌─────────────────┐
│ SERVICE       ├──( fetch )───────┤ OPENWEATHER API │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄ │                  │ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ GET /weather  │                  │ GET /weather    │
│ GET /forecast │                  │ GET /forecast   │
└───────────────┘                  └─────────────────┘
```

The Web UI is responsible for displaying the data that is returned by the Service. For this reason the UI is built to simply accept the data and display it as-is without any processing.

We considered instead to push all the processing from the Service to the Web UI to save compute costs, at the expense of egress, however it seemed that the reduction in payload size was significant enough, while the processing seemed to be minimal, that we opted for the current implementation. We were able to reduce the `/weather` payloads by an average of 73%, while the `/forecast` payloads by 95%. On the other hand the processing involves looping over the given JSON and summarizing it as well as stripping away unnecessary data. It was not measured but the assumption is that the cost of this processing is insignificant. This assumption could later be tested to confirm or reject the hypothesis.

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

The preprocessing that the Service performs is stripping away unnecessary data that is currently not being used by the UI, and summarizing the 5-day/3-hour forecast data into a summary 5-day day display - since that is what the UI currently displays. When the UI requires new data points, or more detail into the forecast view we can update what the Service returns.

The service has two endpoints - `/weather` and `/forecast` which require `lat` and `lon` arguments and map to the same endpoints on the OpenWeather API. The Service takes care of adding the `appid` to the request and thus hides the API key from the user.

The `lat` and `lon` are provided to the Service from the UI by allowing the user to select a City from a typeahead list. While OpenWeather does proivde an endpoint to search for lat/lon of a city by name, we decided to instead use a library that provided a list of cities with lat/lon information in a node module. This way we could store the data in our app and save the network back-and-forth of searching for cities based on letters typed. While the unpacked package _is_ 17.5 MB and _does_ increase our `bundle.js` by a whopping 8.5 MB, we still opted for this solution for this demo. This decision could be challenged and re-evaluted at a later time.


|                                      |   Size (kB) | Size (MB) |
| ------------------------------------ | ----------: | --------: |
| Without `country-state-city` package |     147.172 |      0.14 |
| With `country-state-city` package    |    8864.518 |      8.66 |
| Delta                                | 8717.346 kB |      8.51 |




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


# How to Dev

In order to run the project on your localhost for development purposes, first set the OpenWeather API key as an environment variable
```
export OPENWEATHERAPI_APPID="...";  
```

Then to use Webpack dev server use
```
npm run dev
```

This will host the webpack build on http://localhost:4000, and a mock server on http://localhost:3000 from which the UI will pull the mock data. This is useful for developing offline when working on the React components.

To build the React project into a `/dist` folder use
```
npm run build
```

To run the production Express sever that serves the React UI from the `/dist` folder and exposes the `/weather` and `/forecast` endpoints that talk to the OpenWeather API use
```
npm run serve
```

This will host the build and server on http://locahost:3000 and host the UI from the root.

You can also build and run the server in one command
```
npm run buildandserve
```

## Testing

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

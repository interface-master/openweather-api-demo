import React from 'react';

import WrapperContext from './Wrapper.context';
import WeatherCard from './WeatherCard';

function Weather() {
    const { weatherData } = React.useContext(WrapperContext);

    return (
        <>
            <h1>Current Weather</h1>
            {weatherData && (
                <WeatherCard data={weatherData} />
            )}
        </>
    )
}

export default Weather;
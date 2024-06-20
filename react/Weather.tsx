import React from 'react';

import WrapperContext from './Wrapper.context';
import WeatherCard from './WeatherCard';

function Weather() {
    const { weatherData } = React.useContext(WrapperContext);

    return (weatherData)
        ? (
            <div className='current'>
                <h1>Current Weather</h1>
                <div className='insetWrapper'>
                    <WeatherCard data={weatherData} />
                </div>
            </div>
        )
        : (<></>);
}

export default Weather;
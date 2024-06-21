import { useContext } from 'react';

import WrapperContext from './Wrapper.context';
import WeatherCardCompact from './WeatherCardCompact';

import './Forecast.css';

function Forecast() {
    const { city, forecastData } = useContext(WrapperContext);

    return (forecastData)
    ? (
        <div className='forecast'>
            <h1>5-day Forecast</h1>
            <div className='forecastWrapper'>
                {forecastData.map((weatherData, idx) => (
                    <WeatherCardCompact key={`forecastCard${idx}`} data={weatherData} />
                ))}
            </div>
        </div>
    )
    : (<></>)
}

export default Forecast;
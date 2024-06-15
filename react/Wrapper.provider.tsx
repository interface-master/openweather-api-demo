import { useState } from 'react';
import WrapperContext from './Wrapper.context';
import { ICity } from 'country-state-city';
import { IWeatherCard } from './WeatherCard';

const WrapperProvider = ({children}: {children: React.ReactNode}) => {
    const [ city, setCity ] = useState(undefined as ICity | undefined);
    const [ forecastData, setForecastData ] = useState(undefined as IWeatherCard[] | undefined);
    const [ weatherData, setWeatherData ] = useState(undefined as IWeatherCard | undefined);

    const contextObject = {
        city,
        forecastData,
        weatherData,
        setCity,
        setForecastData,
        setWeatherData,
    };

    return (
        <WrapperContext.Provider value={contextObject}>
            {children}
        </WrapperContext.Provider>
    )
}

export default WrapperProvider;
import { createContext } from 'react';
import { ICity } from 'country-state-city';
import { IWeatherCard } from './WeatherCard';

interface IWrapperContext {
    city?: ICity;
    setCity: (city: ICity) => void;
    weatherData?: IWeatherCard;
    setWeatherData: (data: IWeatherCard) => void;
}

const WrapperContext = createContext<IWrapperContext>({
    city: undefined,
    setCity: (city) => {},
    weatherData: undefined,
    setWeatherData: (data) => {},
});

export default WrapperContext;
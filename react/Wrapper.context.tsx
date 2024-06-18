import { ReactNode, createContext } from 'react';
import { render } from '@testing-library/react';
import { ICity } from 'country-state-city';
import { IWeatherCard } from './WeatherCard';

export interface IWrapperContext {
    city?: ICity;
    forecastData?: IWeatherCard[];
    weatherData?: IWeatherCard;
    setCity: (city: ICity) => void;
    setForecastData: (data: IWeatherCard[]) => void;
    setWeatherData: (data: IWeatherCard) => void;
}

const WrapperContext = createContext<IWrapperContext>({
    city: undefined,
    forecastData: undefined,
    weatherData: undefined,
    setCity: (city) => {},
    setForecastData: (data) => {},
    setWeatherData: (data) => {},
});

export default WrapperContext;
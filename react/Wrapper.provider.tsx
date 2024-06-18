import { ReactNode, useState } from 'react';
import WrapperContext, { IWrapperContext } from './Wrapper.context';
import { ICity } from 'country-state-city';
import { IWeatherCard } from './WeatherCard';

const WrapperProvider = ({children}: {children: React.ReactNode}) => {
    const [ city, setCity ] = useState(undefined as ICity | undefined);
    const [ forecastData, setForecastData ] = useState(undefined as IWeatherCard[] | undefined);
    const [ weatherData, setWeatherData ] = useState(undefined as IWeatherCard | undefined);

    const contextObject: IWrapperContext = {
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

export const defaultStateMock = {
    city: undefined,
    setCity: () => {},
    setForecastData: () => {},
    setWeatherData: () => {}
};

export const WrapperProviderMock = ({children, initialState}: {children: React.ReactNode, initialState: IWrapperContext}) => {
    if (!initialState) {
        initialState = defaultStateMock;
    }
    return (
        <WrapperContext.Provider value={initialState}>
            {children}
        </WrapperContext.Provider>
    );
};

export default WrapperProvider;
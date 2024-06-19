// import { useContext, useEffect, useState } from 'react';
import React from 'react';
import WrapperContext from './Wrapper.context';
import { IWeatherCard } from 'WeatherCard';

function WrapperController({children}: {children: React.ReactNode}) {
    const { city, setWeatherData, setForecastData } = React.useContext(WrapperContext);
    const [ error, setError ] = React.useState(undefined as string | undefined);

    // fetch data when city updates in the context
    React.useEffect(() => {
        if (city) {
            fetchWeatherData();
            fetchForecastData();
        }
    }, [city]);

    // poll for fresh data every 10  minutes
    const tenMinutes = 10 * 60 * 1000; // in milliseconds
    React.useEffect(() => {
        const timerId = setInterval(() => {
            if (city) {
                fetchWeatherData();
                fetchForecastData();
            }
        }, tenMinutes);
        return () => clearTimeout(timerId);
    }, [city]);

    // fetch weather data
    const fetchWeatherData = async () => {
        if (city) {
            const { latitude, longitude } = city;
            const weatherURL = `/weather?lat=${latitude}&lon=${longitude}`;
            try {
                const response = await fetch(weatherURL);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const weatherData: IWeatherCard = await response.json();
                setWeatherData(weatherData);
            } catch (error: any) {
                setError(error.message);
            }
        }
    }

    // fetch forecast data
    const fetchForecastData = async () => {
        if (city) {
            const { latitude, longitude } = city;
            const forecastURL = `/forecast?lat=${latitude}&lon=${longitude}`;
            try {
                const response = await fetch(forecastURL);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const forecastData: IWeatherCard[] = await response.json();
                // build array of WeatherCards from the complete OpenWeather payload
                setForecastData(forecastData);
            } catch (error: any) {
                setError(error.message);
            }
        }
    }

    return (
        <>{children}</>
    )
}

export default WrapperController;
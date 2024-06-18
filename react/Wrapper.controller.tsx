// import { useContext, useEffect, useState } from 'react';
import React from 'react';
import WrapperContext from './Wrapper.context';

function WrapperController({children}: {children: React.ReactNode}) {
    const { city, setWeatherData, setForecastData } = React.useContext(WrapperContext);
    const [ error, setError ] = React.useState(undefined as string | undefined);

    React.useEffect(() => {
        if (city) {
            fetchWeatherData();
            fetchForecastData();
        }
    }, [city]);

    // poller
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

    const fetchWeatherData = async () => {
        if (city) {
            const { latitude, longitude } = city;
            const weatherURL = `/weather?lat=${latitude}&lon=${longitude}`;
            try {
                const response = await fetch(weatherURL);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const jsonData = await response.json();
                // build WeatherCard payload from the complete OpenWeather payload
                const weatherCard = {
                    main: jsonData.weather[0].main,
                    description: jsonData.weather[0].description,
                    temp: jsonData.main.temp,
                    feels_like: jsonData.main.feels_like,
                    temp_min: jsonData.main.temp_min,
                    temp_max: jsonData.main.temp_max,
                    icon: jsonData.weather[0].icon,
                }
                setWeatherData(weatherCard);
            } catch (error: any) {
                setError(error.message);
            }
        }
    }

    const fetchForecastData = async () => {
        if (city) {
            const { latitude, longitude } = city;
            const forecastURL = `/forecast?lat=${latitude}&lon=${longitude}`;
            try {
                const response = await fetch(forecastURL);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const jsonData = await response.json();
                // build array of WeatherCards from the complete OpenWeather payload
                if (jsonData?.list?.length > 0) {
                    const forecastData = jsonData.list.map((i: any) => ({
                        main: i.weather[0].main,
                        description: i.weather[0].description,
                        temp: i.main.temp,
                        feels_like: i.main.feels_like,
                        temp_min: i.main.temp_min,
                        temp_max: i.main.temp_max,
                        icon: i.weather[0].icon,
                    }));
                    setForecastData(forecastData);
                }
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
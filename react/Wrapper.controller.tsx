import { useContext, useEffect, useState } from 'react';
import WrapperContext from './Wrapper.context';

function WrapperController({children}: {children: React.ReactNode}) {
    const { city, setWeatherData } = useContext(WrapperContext);
    const [ error, setError ] = useState(undefined as string | undefined);

    useEffect(() => {
        if (city) {
            fetchWeatherData();
        }
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

    return (
        <>{children}</>
    )
}

export default WrapperController;
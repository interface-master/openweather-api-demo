import { useContext, useEffect, useState } from 'react';
import WrapperContext from './Wrapper.context';

function WrapperController({children}: {children: React.ReactNode}) {
    const { city } = useContext(WrapperContext);
    const [ weatherData, setWeatherData ] = useState(undefined as JSON | undefined);
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
                setWeatherData(jsonData);
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
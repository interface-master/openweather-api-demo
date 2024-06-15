import { useContext } from "react";

import WrapperContext from "./Wrapper.context";
import WeatherCard from "./WeatherCard";

function Weather() {
    const { city, weatherData } = useContext(WrapperContext);

    return (
        <>
            <h1>Weather</h1>
            <div>Selected City: {city?.name}</div>
            {weatherData && (
                <WeatherCard data={weatherData} />
            )}
        </>
    )
}

export default Weather;
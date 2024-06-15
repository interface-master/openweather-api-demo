import { useContext } from "react";

import WrapperContext from "./Wrapper.context";
import WeatherCard from "./WeatherCard";

function Weather() {
    const { city, weatherData } = useContext(WrapperContext);

    return (
        <>
            <h1>Current Weather</h1>
            {weatherData && (
                <WeatherCard data={weatherData} />
            )}
        </>
    )
}

export default Weather;
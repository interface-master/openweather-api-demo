import { useContext } from "react";

import WrapperContext from "./Wrapper.context";
import WeatherCard from "./WeatherCard";

function Forecast() {
    const { city, forecastData } = useContext(WrapperContext);

    return (
        <>
            <h1>5-day Forecast</h1>
            <div className='forecastWrapper'>
                {forecastData && (
                    forecastData.map(weatherData => (
                        <WeatherCard data={weatherData} />
                    ))
                )}
            </div>
        </>
    )
}

export default Forecast;
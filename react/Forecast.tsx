import { useContext } from "react";

import WrapperContext from "./Wrapper.context";
import WeatherCardCompact from "./WeatherCardCompact";

function Forecast() {
    const { city, forecastData } = useContext(WrapperContext);

    return (
        <>
            <h1>5-day Forecast</h1>
            <div className='forecastWrapper'>
                {forecastData && (
                    forecastData.map(weatherData => (
                        <WeatherCardCompact data={weatherData} />
                    ))
                )}
            </div>
        </>
    )
}

export default Forecast;
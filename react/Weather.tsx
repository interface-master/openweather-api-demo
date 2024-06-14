import { useContext } from "react";

import WrapperContext from "./Wrapper.context";

function Weather() {
    const { city } = useContext(WrapperContext);

    return (
        <>
            <h1>Weather</h1>
            <div>Selected City: {city}</div>
        </>
    )
}

export default Weather;
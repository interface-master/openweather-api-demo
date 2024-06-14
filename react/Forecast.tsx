import { useContext } from "react";

import WrapperContext from "./Wrapper.context";

function Forecast() {
    const { city } = useContext(WrapperContext);

    return (
        <>
            <h1>Forecast</h1>
            <div>Selected City: {city}</div>
        </>
    )
}

export default Forecast;
import { useState } from 'react';

import Forecast from './Forecast';
import Search from './Search';
import Weather from './Weather';

function Wrapper() {
    const [city, setCity] = useState('');

    return (
        <>
            <Search />
            <Weather />
            <Forecast />
        </>
    )
}

export default Wrapper;
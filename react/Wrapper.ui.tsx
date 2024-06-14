import { useState } from 'react';

import WrapperContext from './Wrapper.context';

import Forecast from './Forecast';
import Search from './Search';
import Weather from './Weather';

function Wrapper() {
    const [city, setCity] = useState('');

    return (
        <WrapperContext.Provider value={{city, setCity}}>
            <Search />
            <Weather />
            <Forecast />
        </WrapperContext.Provider>
    )
}

export default Wrapper;
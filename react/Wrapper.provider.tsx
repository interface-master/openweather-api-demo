import { useState } from 'react';
import WrapperContext from './Wrapper.context';
import { ICity } from 'country-state-city';

const WrapperProvider = ({children}: {children: React.ReactNode}) => {
    const [city, setCity] = useState(undefined as ICity | undefined);

    const contextObject = {
        city,
        setCity,
    };

    return (
        <WrapperContext.Provider value={contextObject}>
            {children}
        </WrapperContext.Provider>
    )
}

export default WrapperProvider;
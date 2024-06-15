import { createContext } from 'react';
import { ICity } from 'country-state-city';

interface IWrapperContext {
    city?: ICity;
    setCity: (city: ICity) => void;
}

const WrapperContext = createContext<IWrapperContext>({
    city: undefined,
    setCity: (city) => {},
});

export default WrapperContext;
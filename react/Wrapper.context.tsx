import { createContext, useState } from 'react';

const WrapperContext = createContext({
    city: '',
    setCity: (city: string) => {},
});

export default WrapperContext;
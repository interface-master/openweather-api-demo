import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Weather from './Weather';
import { IWrapperContext } from './Wrapper.context';

const contextMock: IWrapperContext = {
    weatherData: {
        "dt": 1718473274,
        "main": "Clear",
        "description": "clear sky",
        "temp": 20,
        "feels_like": 19,
        "temp_min": 19,
        "temp_max": 21,
        "icon": "01d"
    },
    setCity: jest.fn(),
    setWeatherData: jest.fn(),
    setForecastData: jest.fn(),
}

jest.spyOn(React, 'useContext').mockReturnValue( contextMock );

test('renders the Weather correctly', () => {
    render(<Weather />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('Current Weather');
});

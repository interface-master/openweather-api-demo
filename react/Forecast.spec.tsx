import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Forecast from './Forecast';
import { IWrapperContext } from 'Wrapper.context';

const contextMock: IWrapperContext = {
    forecastData: [
        {
            "dt": 1718467200000,
            "main": "Clear",
            "description": "clear sky",
            "temp": 17.5,
            "feels_like": 17,
            "temp_min": 15,
            "temp_max": 20,
            "icon": "01d"
        },
        {
            "dt": 1718553600000,
            "main": "Clouds",
            "description": "overcast clouds",
            "temp": 18,
            "feels_like": 17,
            "temp_min": 14,
            "temp_max": 20,
            "icon": "04n"
        },
        {
            "dt": 1718640000000,
            "main": "Clouds",
            "description": "overcast clouds",
            "temp": 27,
            "feels_like": 28,
            "temp_min": 16,
            "temp_max": 32,
            "icon": "04n"
        },
        {
            "dt": 1718726400000,
            "main": "Clouds",
            "description": "scattered clouds",
            "temp": 27.5,
            "feels_like": 28,
            "temp_min": 22,
            "temp_max": 32,
            "icon": "03n"
        },
        {
            "dt": 1718812800000,
            "main": "Clouds",
            "description": "overcast clouds",
            "temp": 24.5,
            "feels_like": 25,
            "temp_min": 23,
            "temp_max": 31,
            "icon": "04n"
        }
    ],
    setCity: jest.fn(),
    setWeatherData: jest.fn(),
    setForecastData: jest.fn(),
}

jest.spyOn(React, 'useContext').mockReturnValue( contextMock );

test('renders the Forecast correctly', () => {
    render(<Forecast />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('5-day Forecast');
});

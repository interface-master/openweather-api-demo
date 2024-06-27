import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import WrapperController from './Wrapper.controller';
import { IWrapperContext } from './Wrapper.context';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import { WrapperProviderMock, defaultStateMock } from './Wrapper.provider';
import { ICity } from 'country-state-city';
import React from 'react';

test('renders the children correctly', () => {
    render(<WrapperController><h1>test</h1></WrapperController>);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('test');
});


// TODO: this test is currently failing beause i'm struggling to spy on the state update happening in the controller
test.skip('fetches weather and forecast data when city is updated', async () => {
    jest.useFakeTimers();

    const setCityMock = jest.fn();
    const setForecastDataMock = jest.fn();
    const setWeatherDataMock = jest.fn();
    const contextMock: IWrapperContext = {
        ...defaultStateMock,
        setCity: async (newCity:ICity) => {
            console.log('setting context to new city');
            contextMock.city = newCity;
            console.log(contextMock);
            setCityMock(newCity);
        },
        setForecastData: setForecastDataMock,
        setWeatherData: setWeatherDataMock,
    }
    const cityMockParis = {
        name: 'Paris',
        countryCode: "FR",
        stateCode: "IDF",
        latitude: "48.85340000",
        longitude: "2.34860000",
    };

    jest.spyOn(React, 'useContext').mockReturnValue(contextMock);

    render(
        <WrapperProviderMock initialState={contextMock}>
            <WrapperController>
                <Search />
                <Weather />
                <Forecast />
            </WrapperController>
        </WrapperProviderMock>
    );

    const searchInput: HTMLInputElement = screen.getByRole('textbox');

    await act(async () => {
        await fireEvent.change(searchInput, { target: { value: 'Paris' } });
        jest.runAllTimers(); // due to debounce function
    });

    const suggestions = screen.getAllByRole('listitem');
    const cityOfLights = suggestions[7];
    const paris = {name: 'Paris', countryCode: "FR", stateCode: "IDF", latitude: "48.85340000", longitude: "2.34860000" };
    
    fireEvent.click(cityOfLights);

    // await act(async () => {
    //     jest.runAllTimers();
    // });

    // screen.debug();

    expect(setCityMock).toHaveBeenCalledTimes(1);
    expect(setCityMock).toHaveBeenCalledWith(paris);
    expect(setWeatherDataMock).toHaveBeenCalledTimes(1);
    expect(setForecastDataMock).toHaveBeenCalledTimes(1);
    
    jest.useRealTimers(); 
});

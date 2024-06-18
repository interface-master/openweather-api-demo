import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Search from './Search';
import { ReactNode } from 'react';
import WrapperContext, { IWrapperContext } from './Wrapper.context';

const mockSetCity = jest.fn();
const mockSetForecast = jest.fn();
const mockSetWeather = jest.fn();
const renderWithMockContext = (component: ReactNode, initialState: IWrapperContext = { city: {name: 'xyz', countryCode: 'AB', stateCode: 'CD', latitude: '1', longitude: '2' }, setCity: mockSetCity, setForecastData: mockSetForecast, setWeatherData: mockSetWeather }) => {
    return render(<WrapperContext.Provider value={initialState}>{component}</WrapperContext.Provider>);
};

test('renders the Search correctly', () => {
    render(<Search />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('Search');
});

test('updates text with user input', () => {
    render(<Search />);

    const searchInput: HTMLInputElement = screen.getByRole('textbox');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
});

test('displays a list of suggestions', async () => {
    jest.useFakeTimers(); 

    render (<Search />);

    const searchInput: HTMLInputElement = screen.getByRole('textbox');

    await act(async () => {
        await fireEvent.change(searchInput, { target: { value: 'Toronto' } });
        jest.runAllTimers(); // due to debounce function
    });
    
    const suggestions = screen.getAllByRole('listitem');
    const expected = [
        'Toronto, NSW, AU',
        'Toronto, ON, CA',
        'Toronto county, ON, CA',
        'Toronto, OH, US',
    ];
    const filtered = suggestions.filter(item => expected.includes(item.textContent ?? ''));

    expect(suggestions.length).toBe(filtered.length);

    jest.useRealTimers(); 
});

test('updates context with user city selection', async () => {
    jest.useFakeTimers(); 
    
    renderWithMockContext(<Search />);

    const searchInput: HTMLInputElement = screen.getByRole('textbox');

    await act(async () => {
        await fireEvent.change(searchInput, { target: { value: 'Toronto' } });
        jest.runAllTimers(); // due to debounce function
    });

    const suggestions = screen.getAllByRole('listitem');
    const thesix = suggestions[1];
    const toronto = {'countryCode': 'CA', 'latitude': '43.70011000', 'longitude': '-79.41630000', 'name': 'Toronto', 'stateCode': 'ON'};
    
    fireEvent.click(thesix);

    expect(mockSetCity).toHaveBeenCalledTimes(1);
    expect(mockSetCity).toHaveBeenCalledWith(toronto);

    jest.useRealTimers(); 
});

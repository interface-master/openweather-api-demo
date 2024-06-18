import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Search from './Search';
import { IWrapperContext } from './Wrapper.context';
import { WrapperProviderMock, defaultStateMock } from './Wrapper.provider';

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
    
    const setCityMock = jest.fn();
    const contextMock: IWrapperContext = {
        ...defaultStateMock,
        setCity: setCityMock,
    }

    render(
        <WrapperProviderMock initialState={contextMock}>
            <Search />
        </WrapperProviderMock>
    );

    const searchInput: HTMLInputElement = screen.getByRole('textbox');

    await act(async () => {
        await fireEvent.change(searchInput, { target: { value: 'Toronto' } });
        jest.runAllTimers(); // due to debounce function
    });

    const suggestions = screen.getAllByRole('listitem');
    const thesix = suggestions[1];
    const toronto = {'countryCode': 'CA', 'latitude': '43.70011000', 'longitude': '-79.41630000', 'name': 'Toronto', 'stateCode': 'ON'};
    
    fireEvent.click(thesix);

    expect(setCityMock).toHaveBeenCalledTimes(1);
    expect(setCityMock).toHaveBeenCalledWith(toronto);

    jest.useRealTimers(); 
});

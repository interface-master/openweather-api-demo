import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import WeatherCardCompact from './WeatherCardCompact';
import { IWeatherCard } from './WeatherCard';

const sunnyData: IWeatherCard = {
    main: 'Sunny',
    description: 'Sunny Sunshine',
    temp: '678',
    feels_like: '679',
    temp_min: '600',
    temp_max: '700',
    icon: '01d',
}

test('renders the Weather correctly', () => {
    render(<WeatherCardCompact data={sunnyData} />);

    const temp = screen.getByTestId('temp');
    const feels = screen.getByTestId('feels');
    const icon = screen.getByTestId('icon')?.querySelector('img') ?? {src:'', alt:''};
    const high = screen.getByTestId('high');
    const low = screen.getByTestId('low');

    expect(temp).toHaveTextContent(sunnyData.temp);
    expect(feels).toHaveTextContent(`(${sunnyData.feels_like}°)`);
    expect(icon.src).toBe(`https://openweathermap.org/img/wn/${sunnyData.icon}@2x.png`);
    expect(icon.alt).toBe(sunnyData.description);
    expect(high).toHaveTextContent(`${sunnyData.temp_max}°`);
    expect(low).toHaveTextContent(`${sunnyData.temp_min}°`);
});

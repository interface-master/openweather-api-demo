import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import WeatherCard, { IWeatherCard } from './WeatherCard';

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
    render(<WeatherCard data={sunnyData} />);

    const temp = screen.getByTestId('temp');
    const icon = screen.getByTestId('icon')?.querySelector('img') ?? {src:'', alt:''};
    const high = screen.getByTestId('high');
    const low = screen.getByTestId('low');
    const main = screen.getByTestId('main');
    const feels = screen.getByTestId('feels');

    expect(temp).toHaveTextContent(sunnyData.temp);
    expect(icon.src).toBe(`https://openweathermap.org/img/wn/${sunnyData.icon}@2x.png`);
    expect(icon.alt).toBe(sunnyData.description);
    expect(high).toHaveTextContent(`High: ${sunnyData.temp_max}`);
    expect(low).toHaveTextContent(`Low: ${sunnyData.temp_min}`);
    expect(main).toHaveTextContent(sunnyData.main);
    expect(feels).toHaveTextContent(`Feels like ${sunnyData.feels_like}`);
});

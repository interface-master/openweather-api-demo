import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from './App';

test('renders the App correctly', () => {
    render(<App />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('OpenWeather API Demo');
});

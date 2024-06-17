import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Forecast from './Forecast';

test('renders the Forecast correctly', () => {
    render(<Forecast />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('5-day Forecast');
});

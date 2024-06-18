import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Weather from './Weather';

test('renders the Weather correctly', () => {
    render(<Weather />);

    const heading = screen.getAllByRole('heading')[0];
    expect(heading).toHaveTextContent('Current Weather');
});

import React from 'react';
import ScreenerOutcome from '../ScreenerOutcome';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
    render(<ScreenerOutcome type={''} />);
});

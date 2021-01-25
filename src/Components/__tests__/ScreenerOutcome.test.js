import React from 'react';
import ScreenerOutcome from '../ScreenerOutcome';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<ScreenerOutcome type={''} />);
});

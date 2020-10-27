import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';

describe('<App />', () => {
	it('should render correctly', () => {
		const { container, getByText } = render(<App />);

		expect(getByText('Money Exchange')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
});

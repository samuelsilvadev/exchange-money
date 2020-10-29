import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';

describe('<App />', () => {
	it('should render correctly', () => {
		const { container, getByText, getByLabelText } = render(<App />);

		expect(getByText('Pockets')).toBeVisible();
		expect(getByLabelText('Pocket')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
});

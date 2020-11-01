import React from 'react';
import { render, waitFor } from '@testing-library/react';

import App from '../App';

jest.mock('../../services/market-rates', () => ({
	getMarketRates: () => Promise.resolve(),
}));

jest.mock('../../services/pockets', () => ({
	getPockets: () => Promise.resolve(),
}));

describe('<App />', () => {
	it('should render correctly', async () => {
		const { container, getByText, getByLabelText } = render(<App />);

		await waitFor(() => {
			expect(getByText('Pockets')).toBeVisible();
			expect(getByLabelText('Pocket')).toBeVisible();
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

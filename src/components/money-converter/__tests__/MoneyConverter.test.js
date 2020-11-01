import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { MarketRatesProvider } from '../../../providers/market-rates/MarketRatesProvider';
import { PocketsProvider } from '../../../providers/pockets/PocketsProvider';
import MoneyConverter from '../MoneyConverter';

jest.mock('../../../services/market-rates', () => ({
	getMarketRates: () => Promise.resolve(),
}));

describe('<MoneyConverter />', () => {
	it('should render correctly', async () => {
		const {
			container,
			getAllByLabelText,
			getByLabelText,
			getByText,
		} = render(
			<PocketsProvider>
				<MarketRatesProvider>
					<MoneyConverter />
				</MarketRatesProvider>
			</PocketsProvider>
		);

		await waitFor(() => {
			expect(getByText('You spend')).toBeVisible();
			expect(getByText('You get')).toBeVisible();
			expect(getByText('Converter Now')).toBeVisible();
			expect(getByText('Market Rate')).toBeVisible();
			expect(getByLabelText('Swap currencies')).toBeVisible();
			expect(getAllByLabelText('Currency')).toHaveLength(2);
			expect(container.firstChild).toMatchSnapshot();
		});
	});
});

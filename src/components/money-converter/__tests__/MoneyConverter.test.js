import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { MarketRatesProvider } from '../../../providers/market-rates/MarketRatesProvider';
import { PocketsProvider } from '../../../providers/pockets/PocketsProvider';
import MoneyConverter from '../MoneyConverter';

jest.mock('../../../services/market-rates', () => ({
	getMarketRates: () => Promise.resolve({ rates: { USD: 1, EUR: 0.8765 } }),
}));

jest.mock('../../../services/pockets', () => ({
	getPockets: () =>
		Promise.resolve([
			{
				label: 'USD',
				value: 1000,
			},
			{
				label: 'GBP',
				value: 5000,
			},
			{
				label: 'EUR',
				value: 2000,
			},
		]),
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
		});

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should show correct market rate values', async () => {
		const { getByText, getAllByLabelText } = render(
			<PocketsProvider>
				<MarketRatesProvider>
					<MoneyConverter />
				</MarketRatesProvider>
			</PocketsProvider>
		);

		let toSelect;

		await waitFor(() => {
			toSelect = getAllByLabelText('Currency')[1];

			expect(getByText('1 USD = 1 USD'));
		});

		fireEvent.change(toSelect, { target: { value: 'EUR' } });

		expect(getByText('1 USD = 0.8765 EUR'));
	});

	it('should display how much I will receive when make the conversion', async () => {
		const { getByLabelText, getAllByLabelText } = render(
			<PocketsProvider>
				<MarketRatesProvider>
					<MoneyConverter />
				</MarketRatesProvider>
			</PocketsProvider>
		);

		let fromInput;
		let toInput;
		let toSelect;

		await waitFor(() => {
			fromInput = getByLabelText('You spend');
			toInput = getByLabelText('You get');
			toSelect = getAllByLabelText('Currency')[1];
		});

		fireEvent.change(toSelect, { target: { value: 'EUR' } });
		fireEvent.change(fromInput, { target: { value: '10' } });

		expect(toInput).toHaveValue(8.76);
	});
});

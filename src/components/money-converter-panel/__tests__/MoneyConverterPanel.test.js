import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import { PocketsProvider } from '../../../providers/pockets/PocketsProvider';
import MoneyConverterPanel from '../MoneyConverterPanel';

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

describe('<MoneyConverterPanel />', () => {
	it('should render correctly', async () => {
		const { container, getByLabelText, getByText } = render(
			<PocketsProvider>
				<MoneyConverterPanel label="You get" />
			</PocketsProvider>
		);

		await waitFor(() => {
			expect(getByLabelText('Currency')).toBeVisible();
			expect(getByText('You get')).toBeVisible();
		});

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should call `handlers.currency` correctly when the currency changes', async () => {
		const currencyHandler = jest.fn();

		const { getByLabelText } = render(
			<PocketsProvider>
				<MoneyConverterPanel
					handlers={{ currency: currencyHandler }}
					label="You get"
				/>
			</PocketsProvider>
		);

		let currencySelect;

		await waitFor(() => {
			currencySelect = getByLabelText('Currency');
		});

		fireEvent.change(currencySelect, { target: { value: 'EUR' } });

		expect(currencyHandler).toHaveBeenCalledTimes(2);
		expect(currencyHandler.mock.calls[0][0]).toBe('USD');
		expect(currencyHandler.mock.calls[1][0]).toBe('EUR');
	});

	it('should call `handlers.moneyAmount` correctly when the currency changes', async () => {
		const moneyAmountHandler = jest.fn();

		const { getByLabelText } = render(
			<PocketsProvider>
				<MoneyConverterPanel
					values={{ moneyAmount: '' }}
					handlers={{ moneyAmount: moneyAmountHandler }}
					label="You get"
				/>
			</PocketsProvider>
		);

		let input;

		await waitFor(() => {
			input = getByLabelText('You get');
		});

		fireEvent.change(input, { target: { value: '10' } });

		expect(moneyAmountHandler).toHaveBeenCalledTimes(1);
		expect(moneyAmountHandler.mock.calls[0][0]).toBe('10');
	});

	it('should keep the `moneyAmount` formatted', async () => {
		const { getByLabelText } = render(
			<PocketsProvider>
				<MoneyConverterPanel label="You get" />
			</PocketsProvider>
		);

		let input;

		await waitFor(() => {
			input = getByLabelText('You get');
		});

		fireEvent.change(input, { target: { value: '10.9999' } });

		expect(input).toHaveDisplayValue('10.99');
	});
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import { PocketsProvider } from '../../../providers/pockets/PocketsProvider';
import Pockets from '../Pockets';

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

describe('<Pockets />', () => {
	it('should render correctly', async () => {
		const { container, getByLabelText, getByText } = render(
			<PocketsProvider>
				<Pockets />
			</PocketsProvider>
		);

		await waitFor(() => {
			expect(getByLabelText('Pocket')).toBeVisible();
			expect(getByText('Total Ballance')).toBeVisible();

			expect(getByText('USD')).toBeVisible();
			expect(getByText('1000')).toBeVisible();
			expect(container.firstChild).toMatchSnapshot();
		});
	});

	it('should change the selected pocket correctly', async () => {
		const { getByLabelText, getByText } = render(
			<PocketsProvider>
				<Pockets />
			</PocketsProvider>
		);

		await waitFor(() => {
			const select = getByLabelText('Pocket');

			expect(getByText('USD')).toBeVisible();
			expect(getByText('1000')).toBeVisible();

			fireEvent.change(select, { target: { value: 'GBP' } });

			expect(getByText('GBP')).toBeVisible();
			expect(getByText('5000')).toBeVisible();
		});
	});
});

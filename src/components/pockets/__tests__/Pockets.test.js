import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
	PocketsProvider,
	pockets,
} from '../../../providers/pockets/PocketsProvider';
import Pockets from '../Pockets';

describe('<Pockets />', () => {
	it('should render correctly', () => {
		const { container, getByLabelText, getByText } = render(
			<PocketsProvider>
				<Pockets />
			</PocketsProvider>
		);

		expect(getByLabelText('Pocket')).toBeVisible();
		expect(getByText('Total Ballance')).toBeVisible();

		expect(getByText(pockets[0].label)).toBeVisible();
		expect(getByText(pockets[0].value.toString())).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should change the selected pocket correctly', () => {
		const { getByLabelText, getByText } = render(
			<PocketsProvider>
				<Pockets />
			</PocketsProvider>
		);

		const select = getByLabelText('Pocket');

		expect(getByText(pockets[0].label)).toBeVisible();
		expect(getByText(pockets[0].value.toString())).toBeVisible();

		fireEvent.change(select, { target: { value: 'GBP' } });

		expect(getByText(pockets[1].label)).toBeVisible();
		expect(getByText(pockets[1].value.toString())).toBeVisible();
	});
});

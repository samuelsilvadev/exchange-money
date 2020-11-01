import React from 'react';
import { render } from '@testing-library/react';

import { PocketsProvider } from '../../../providers/pockets/PocketsProvider';
import MoneyConverter from '../MoneyConverter';

describe('<MoneyConverter />', () => {
	it('should render correctly', () => {
		const {
			container,
			getAllByLabelText,
			getByLabelText,
			getByText,
		} = render(
			<PocketsProvider>
				<MoneyConverter />
			</PocketsProvider>
		);

		expect(getByText('You spend')).toBeVisible();
		expect(getByText('You get')).toBeVisible();
		expect(getByText('Converter Now')).toBeVisible();
		expect(getByText('Market Rate')).toBeVisible();
		expect(getByLabelText('Swap currencies')).toBeVisible();
		expect(getAllByLabelText('Currency')).toHaveLength(2);

		expect(container.firstChild).toMatchSnapshot();
	});
});

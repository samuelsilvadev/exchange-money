import React from 'react';
import { render } from '@testing-library/react';

import { PocketsProvider } from '../../../providers/pockets/PocketsProvider';
import MoneyConverterPanel from '../MoneyConverterPanel';

describe('<MoneyConverterPanel />', () => {
	it('should render correctly', () => {
		const { container, getByLabelText, getByText } = render(
			<PocketsProvider>
				<MoneyConverterPanel label="You get" />
			</PocketsProvider>
		);

		expect(getByLabelText('Currency')).toBeVisible();
		expect(getByText('You get')).toBeVisible();

		expect(container.firstChild).toMatchSnapshot();
	});
});

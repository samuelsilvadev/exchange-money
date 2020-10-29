import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { PocketsProvider, usePocketsContext } from '../PocketsProvider';

const wrapper = ({ children }) => <PocketsProvider>{children}</PocketsProvider>;

describe('<PocketsProvider />', () => {
	it('should render children correctly', () => {
		const { getByText } = render(
			<PocketsProvider>
				<h1>children as title</h1>
			</PocketsProvider>
		);

		expect(getByText('children as title')).toBeVisible();
	});

	it('should get the pockets values correctly', () => {
		const { result } = renderHook(() => usePocketsContext(), { wrapper });

		const [usdPocket, gbpPocket, eurPocket] = result.current;

		expect(usdPocket.label).toBe('USD');
		expect(usdPocket.value).toBe(1000);

		expect(gbpPocket.label).toBe('GBP');
		expect(gbpPocket.value).toBe(5000);

		expect(eurPocket.label).toBe('EUR');
		expect(eurPocket.value).toBe(2000);
	});

	it('should throw an error if the provider is not set', () => {
		const { result } = renderHook(() => usePocketsContext());

		expect(result.error).toEqual(
			TypeError(
				'To use the PocketsContext correctly you should wrap your component with <PocketsProvider />'
			)
		);
	});
});

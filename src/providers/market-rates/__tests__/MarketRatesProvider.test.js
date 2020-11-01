import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
	MarketRatesProvider,
	useMarketRatesContext,
	POLL_TIME_IN_MILLISECONDS,
} from '../MarketRatesProvider';

import { getMarketRates } from '../../../services/market-rates';

jest.useFakeTimers();
jest.mock('../../../services/market-rates');

const wrapper = ({ children }) => (
	<MarketRatesProvider>{children}</MarketRatesProvider>
);

describe('<MarketRatesProvider />', () => {
	beforeEach(jest.clearAllMocks);
	afterEach(jest.clearAllTimers);

	it('should render children correctly', async () => {
		getMarketRates.mockImplementationOnce(() => Promise.resolve());

		const { getByText } = render(
			<MarketRatesProvider>
				<h1>children as title</h1>
			</MarketRatesProvider>
		);

		await waitFor(() => {
			expect(getByText('children as title')).toBeVisible();
		});
	});

	it('should call the `getMarketRates` service on render', async () => {
		getMarketRates.mockImplementationOnce(() =>
			Promise.resolve({
				rates: {},
			})
		);

		render(<MarketRatesProvider />);

		await waitFor(() => {
			expect(getMarketRates).toHaveBeenCalledTimes(1);
		});
	});

	it('should get the correct result from `getMarketRates` service', async () => {
		getMarketRates.mockImplementationOnce(() =>
			Promise.resolve({
				rates: {
					USD: 1,
				},
			})
		);

		const { result, waitForNextUpdate } = renderHook(
			() => useMarketRatesContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		expect(result.current.isLoading).toBe(false);
		expect(result.current.hasError).toBe(false);
		expect(result.current.result).toEqual({
			USD: 1,
		});
	});

	it('should get the correct result from `getMarketRates` even if it fails', async () => {
		getMarketRates.mockImplementationOnce(() =>
			Promise.reject(new Error('Network issues'))
		);

		const { result, waitForNextUpdate } = renderHook(
			() => useMarketRatesContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		expect(result.current.isLoading).toBe(false);
		expect(result.current.hasError).toBe(true);
		expect(result.current.result).toEqual({});
	});

	it('should throw an error if the provider is not set', () => {
		const { result } = renderHook(() => useMarketRatesContext());

		expect(result.error).toEqual(
			TypeError(
				'To use the MarketRatesContext correctly you should wrap your component with <MarketRatesProvider />'
			)
		);
	});

	it('should call the getMarketRates from time to time', async () => {
		getMarketRates.mockImplementation(() =>
			Promise.resolve({
				rates: {
					USD: 1,
				},
			})
		);
		render(<MarketRatesProvider />);

		jest.advanceTimersByTime(POLL_TIME_IN_MILLISECONDS);

		await waitFor(() => {
			expect(getMarketRates).toHaveBeenCalledTimes(2);
		});
	});
});

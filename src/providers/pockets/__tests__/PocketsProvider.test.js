import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { PocketsProvider, usePocketsContext } from '../PocketsProvider';

import { getPockets } from '../../../services/pockets';

jest.mock('../../../services/pockets');

const wrapper = ({ children }) => <PocketsProvider>{children}</PocketsProvider>;

describe('<PocketsProvider />', () => {
	beforeEach(jest.clearAllMocks);

	it('should render children correctly', async () => {
		getPockets.mockImplementationOnce(() => Promise.resolve());

		const { getByText } = render(
			<PocketsProvider>
				<h1>children as title</h1>
			</PocketsProvider>
		);

		await waitFor(() => {
			expect(getByText('children as title')).toBeVisible();
		});
	});

	it('should get the pockets values correctly', async () => {
		getPockets.mockImplementationOnce(() =>
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
			])
		);

		const { result, waitForNextUpdate } = renderHook(
			() => usePocketsContext(),
			{ wrapper }
		);

		await waitForNextUpdate();

		const { result: pockets } = result.current;
		const [usdPocket, gbpPocket, eurPocket] = pockets;

		expect(usdPocket.label).toBe('USD');
		expect(usdPocket.value).toBe(1000);

		expect(gbpPocket.label).toBe('GBP');
		expect(gbpPocket.value).toBe(5000);

		expect(eurPocket.label).toBe('EUR');
		expect(eurPocket.value).toBe(2000);
	});

	it('should call the `getPockets` service on render', async () => {
		getPockets.mockImplementationOnce(() => Promise.resolve());

		render(<PocketsProvider />);

		await waitFor(() => {
			expect(getPockets).toHaveBeenCalledTimes(1);
		});
	});

	it('should get the correct result from `getPockets` service', async () => {
		getPockets.mockImplementationOnce(() =>
			Promise.resolve([
				{
					label: 'USD',
					value: 1000,
				},
			])
		);

		const { result, waitForNextUpdate } = renderHook(
			() => usePocketsContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		expect(result.current.isLoading).toBe(false);
		expect(result.current.hasError).toBe(false);
		expect(result.current.result).toEqual([
			{
				label: 'USD',
				value: 1000,
			},
		]);
	});

	it('should get the correct result from `getPockets` even if it fails', async () => {
		getPockets.mockImplementationOnce(() =>
			Promise.reject(new Error('Network issues'))
		);

		const { result, waitForNextUpdate } = renderHook(
			() => usePocketsContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		expect(result.current.isLoading).toBe(false);
		expect(result.current.hasError).toBe(true);
		expect(result.current.result).toEqual([]);
	});

	it('should make a transfer successfully', async () => {
		getPockets.mockImplementationOnce(() =>
			Promise.resolve([
				{
					label: 'USD',
					value: 1000,
				},
				{
					label: 'GBP',
					value: 5000,
				},
			])
		);

		const { result, waitForNextUpdate } = renderHook(
			() => usePocketsContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		const from = {
			currency: 'USD',
			moneyAmount: 50,
		};

		const to = {
			currency: 'GBP',
			moneyAmount: 60,
		};

		await act(async () => {
			await result.current.transfer(from, to);
		});

		expect(result.current.result).toEqual([
			{
				label: 'USD',
				value: 950,
			},
			{
				label: 'GBP',
				value: 5060,
			},
		]);
	});

	it('should fail at making a transfer when the pocket is empty', async () => {
		getPockets.mockImplementationOnce(() =>
			Promise.resolve([
				{
					label: 'USD',
					value: 0,
				},
				{
					label: 'GBP',
					value: 2000,
				},
			])
		);

		const { result, waitForNextUpdate } = renderHook(
			() => usePocketsContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		const from = {
			currency: 'USD',
			moneyAmount: 1,
		};

		const to = {
			currency: 'GBP',
			moneyAmount: 2,
		};

		let transferError;

		await act(async () => {
			transferError = await result.current.transfer(from, to);
		});

		expect(transferError.message).toBe('Your USD pocket is empty');
		expect(result.current.hasError).toBe(true);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.result).toEqual([
			{
				label: 'USD',
				value: 0,
			},
			{
				label: 'GBP',
				value: 2000,
			},
		]);
	});

	it('should fail at making a transfer when the value to be transferred is bigger then the pocket amount', async () => {
		getPockets.mockImplementationOnce(() =>
			Promise.resolve([
				{
					label: 'USD',
					value: 10,
				},
				{
					label: 'GBP',
					value: 10,
				},
			])
		);

		const { result, waitForNextUpdate } = renderHook(
			() => usePocketsContext(),
			{
				wrapper,
			}
		);

		await waitForNextUpdate();

		const from = {
			currency: 'USD',
			moneyAmount: 20,
		};

		const to = {
			currency: 'GBP',
			moneyAmount: 22,
		};

		let transferError;

		await act(async () => {
			transferError = await result.current.transfer(from, to);
		});

		expect(transferError.message).toBe(
			'Insufficient money on your USD pocket'
		);
		expect(result.current.hasError).toBe(true);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.result).toEqual([
			{
				label: 'USD',
				value: 10,
			},
			{
				label: 'GBP',
				value: 10,
			},
		]);
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

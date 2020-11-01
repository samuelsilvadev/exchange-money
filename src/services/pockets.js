export const initialState = [
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
];

export function getPockets() {
	return Promise.resolve(initialState);
}

import React, { createContext, useContext } from 'react';

/**
 * A pocket description.
 *
 * @typedef {Object} Pocket
 * @property {string} label
 * @property {number} value
 */

export const pockets = [
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

const PocketsContext = createContext();

export function PocketsProvider(props) {
	// TODO: set a default value for the pockets when it comes from api.
	return <PocketsContext.Provider value={pockets} {...props} />;
}

/**
 * Get pocket values from global storage.
 *
 * @returns {Array<Pocket>} - List of pockets objects.
 */
export function usePocketsContext() {
	const pockets = useContext(PocketsContext);

	if (typeof pockets === 'undefined') {
		throw new TypeError(
			'To use the PocketsContext correctly you should wrap your component with <PocketsProvider />'
		);
	}

	return pockets;
}

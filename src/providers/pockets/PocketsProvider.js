import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import { getPockets } from '../../services/pockets';

/**
 * A pocket description.
 *
 * @typedef {Object} Pocket
 * @property {string} label
 * @property {number} value
 */

/**
 * The pocket context description.
 *
 * @typedef {Object} PocketsContext
 * @property {boolean} isLoading
 * @property {boolean} hasError
 * @property {Array<Pocket>} result
 * @property {Function} transfer
 */

const checkForErrorOnTransferValues = ({ pocket, value }) => {
	if (pocket.value === 0) {
		return new TypeError(`Your ${pocket.label} pocket is empty`);
	}

	if (pocket.value < value) {
		return new TypeError(
			`Insufficient money on your ${pocket.label} pocket`
		);
	}

	return null;
};

const PocketsContext = createContext();

export function PocketsProvider(props) {
	const [pockets, setPockets] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);

		getPockets()
			.then((data) => {
				if (data) {
					setPockets(data);
				}
			})
			.catch(() => setHasError(true))
			.finally(() => setIsLoading(false));
	}, []);

	const transfer = useCallback(
		(from, to) => {
			setIsLoading(true);
			setHasError(false);

			return new Promise((resolve, reject) => {
				const updatedPockets = pockets.reduce(
					(updatedPockets, currentPocket) => {
						const pocket = { ...currentPocket };

						if (pocket.label === from.currency) {
							const parsedFromMoneyAmount = parseFloat(
								from.moneyAmount
							);
							const error = checkForErrorOnTransferValues({
								pocket,
								value: parsedFromMoneyAmount,
							});

							if (error) {
								return reject(error);
							}

							pocket.value -= parsedFromMoneyAmount;
						} else if (pocket.label === to.currency) {
							pocket.value += parseFloat(to.moneyAmount);
						}

						updatedPockets.push(pocket);

						return updatedPockets;
					},
					[]
				);

				setPockets(updatedPockets);

				resolve();
			})
				.catch((error) => {
					setHasError(true);

					return error;
				})
				.finally(() => setIsLoading(false));
		},
		[pockets]
	);

	const context = useMemo(() => {
		return {
			isLoading,
			hasError,
			result: pockets,
			transfer,
		};
	}, [isLoading, hasError, pockets, transfer]);

	return <PocketsContext.Provider value={context} {...props} />;
}

/**
 * Get pocket values from global storage.
 *
 * @returns {PocketsContext} - Result set of pockets objects.
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

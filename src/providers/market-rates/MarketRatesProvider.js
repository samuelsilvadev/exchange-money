import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import { getMarketRates } from '../../services/market-rates';

/**
 * The market rates context description.
 *
 * @typedef {Object} MarketRatesContext
 * @property {boolean} isLoading
 * @property {boolean} hasError
 * @property {Object.<string, number>} result
 */

const MarketRatesContext = createContext();

export function MarketRatesProvider(props) {
	const [marketRates, setMarketRates] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		setHasError(false);

		getMarketRates()
			.then((data) => {
				if (data?.rates) {
					setMarketRates(data.rates);
				}
			})
			.catch(() => setHasError(true))
			.finally(() => setIsLoading(false));
	}, []);

	const context = useMemo(() => {
		return {
			isLoading,
			hasError,
			result: marketRates,
		};
	}, [isLoading, hasError, marketRates]);

	return <MarketRatesContext.Provider value={context} {...props} />;
}

/**
 * Get market rates from global storage.
 *
 * @returns {MarketRatesContext} - The market rates context result.
 */
export function useMarketRatesContext() {
	const marketRates = useContext(MarketRatesContext);

	if (typeof marketRates === 'undefined') {
		throw new TypeError(
			'To use the MarketRatesContext correctly you should wrap your component with <MarketRatesProvider />'
		);
	}

	return marketRates;
}

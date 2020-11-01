export function getMarketRates() {
	// TODO: Update endpoint to come from a API_DEFINITIONS file.
	return fetch(
		`https://openexchangerates.org/api/latest.json?app_id=${process.env.RAZZLE_OPEN_EXCHANGE_RATES_APP_ID}`
	).then((data) => data.json());
}

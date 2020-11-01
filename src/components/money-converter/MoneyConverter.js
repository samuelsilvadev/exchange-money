import React, { useEffect, useReducer, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { useMarketRatesContext } from '../../providers/market-rates/MarketRatesProvider';
import MoneyConverterPanel from '../money-converter-panel/MoneyConverterPanel';
import Swap from '../icons/Swap';

import styles from './MoneyConverter.module.css';
import { usePocketsContext } from '../../providers/pockets/PocketsProvider';
import stringToDecimal from '../../formatter/stringToDecimal';

const ACTION_TYPES = {
	SET_FROM_CURRENCY: 'SET_FROM_CURRENCY',
	SET_TO_CURRENCY: 'SET_TO_CURRENCY',
	SET_FROM_MONEY_AMOUNT: 'SET_FROM_MONEY_AMOUNT',
	SET_TO_MONEY_AMOUNT: 'SET_TO_MONEY_AMOUNT',
	SWAP_CURRENCIES: 'SWAP_CURRENCIES',
	RESET_MONEY_AMOUNT: 'RESET_MONEY_AMOUNT',
};

const INITIAL_STATE = {
	from: {
		currency: '',
		moneyAmount: '',
	},
	to: {
		currency: '',
		moneyAmount: '',
	},
};

function reducer(state, action) {
	switch (action.type) {
		case ACTION_TYPES.SET_FROM_CURRENCY: {
			return {
				...state,
				from: {
					...state.from,
					currency: action.payload,
				},
			};
		}
		case ACTION_TYPES.SET_TO_CURRENCY: {
			return {
				...state,
				to: {
					...state.to,
					currency: action.payload,
				},
			};
		}
		case ACTION_TYPES.SET_FROM_MONEY_AMOUNT: {
			return {
				...state,
				from: {
					...state.from,
					moneyAmount: action.payload,
				},
			};
		}
		case ACTION_TYPES.SET_TO_MONEY_AMOUNT: {
			return {
				...state,
				to: {
					...state.to,
					moneyAmount: action.payload,
				},
			};
		}
		case ACTION_TYPES.SWAP_CURRENCIES: {
			const [nextToCurrency, nextFromCurrency] = [
				state.from.currency,
				state.to.currency,
			];

			return {
				...state,
				from: {
					...state.from,
					currency: nextFromCurrency,
				},
				to: {
					...state.to,
					currency: nextToCurrency,
				},
			};
		}
		case ACTION_TYPES.RESET_MONEY_AMOUNT: {
			return {
				from: {
					...state.from,
					moneyAmount: '',
				},
				to: {
					...state.to,
					moneyAmount: '',
				},
			};
		}
	}
}

const ERROR_MESSAGES = {
	FILL_UP_SPEND_FIELD: 'You need to fill up the spend field',
	CHANGE_CURRENCIES: 'You need to change the one of the currencies',
};

function calculateCurrentRate({ from, to, rates = {}, base = 'USD' }) {
	if (!from.currency || !to.currency) {
		return;
	}

	if (from.currency === base) {
		return rates[to.currency];
	}

	if (to.currency === base) {
		return 1 / rates[from.currency];
	}

	return rates[to.currency] * (1 / rates[from.currency]);
}

function formatCurrentRate(rate) {
	return rate?.toString()?.slice(0, 6);
}

function MoneyConverter(props) {
	const { className } = props;

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const [submitFormError, setSubmitFormError] = useState();

	const { transfer, isLoading: isPocketsLoading } = usePocketsContext();
	const {
		result: marketRates,
		isLoading: isMarketsRatesLoading,
	} = useMarketRatesContext();
	const currentRate = calculateCurrentRate({
		from: state.from,
		to: state.to,
		rates: marketRates,
	});
	const hasCurrentRate = typeof currentRate !== 'undefined';

	const handleChangeFactory = (type) => (value) => {
		dispatch({ type, payload: value });
	};

	const handleSwapClick = () => {
		dispatch({ type: ACTION_TYPES.SWAP_CURRENCIES });
	};

	const handleOnConvertMoney = (event) => {
		event.preventDefault();

		setSubmitFormError();

		const { to, from } = state;

		if (!to.moneyAmount || !from.moneyAmount) {
			setSubmitFormError(ERROR_MESSAGES.FILL_UP_SPEND_FIELD);
			return;
		}

		if (to.currency === from.currency) {
			setSubmitFormError(ERROR_MESSAGES.CHANGE_CURRENCIES);
			return;
		}

		transfer(from, to)
			.then(() => {
				dispatch({ type: ACTION_TYPES.RESET_MONEY_AMOUNT });
			})
			.catch((error) => {
				setSubmitFormError(error.message);
			});
	};

	useEffect(() => {
		const valueToReceive = state.from.moneyAmount * currentRate;
		const formattedMoneyAmount = state.from.moneyAmount
			? stringToDecimal(valueToReceive.toString())
			: '';

		dispatch({
			type: ACTION_TYPES.SET_TO_MONEY_AMOUNT,
			payload: formattedMoneyAmount,
		});
	}, [state.from.moneyAmount, currentRate]);

	return (
		<form
			onSubmit={handleOnConvertMoney}
			className={classnames(styles.wrapper, { [className]: className })}
		>
			{submitFormError && (
				<p className={styles.errorPanel} role="alert">
					{submitFormError}
				</p>
			)}
			<div className={styles.panelsWrapper}>
				<MoneyConverterPanel
					className={styles.panel}
					label="You spend"
					handlers={{
						currency: handleChangeFactory(
							ACTION_TYPES.SET_FROM_CURRENCY
						),
						moneyAmount: handleChangeFactory(
							ACTION_TYPES.SET_FROM_MONEY_AMOUNT
						),
					}}
					values={{
						currency: state.from.currency,
						moneyAmount: state.from.moneyAmount,
					}}
				/>
				<button
					type="button"
					className={styles.swapButton}
					aria-label="Swap currencies"
					onClick={handleSwapClick}
				>
					<Swap />
				</button>
				<MoneyConverterPanel
					className={styles.panel}
					label="You get"
					handlers={{
						currency: handleChangeFactory(
							ACTION_TYPES.SET_TO_CURRENCY
						),
						moneyAmount: handleChangeFactory(
							ACTION_TYPES.SET_TO_MONEY_AMOUNT
						),
					}}
					values={{
						currency: state.to.currency,
						moneyAmount: state.to.moneyAmount,
					}}
				/>
			</div>
			<div className={styles.marketRateWrapper}>
				<p className={styles.marketRateDescription}>Market Rate</p>
				<p className={styles.marketRateValue}>
					{hasCurrentRate
						? `1 ${state.from.currency} = ${formatCurrentRate(
								currentRate
						  )} ${state.to.currency}`
						: '-'}
				</p>
			</div>
			<button
				disabled={isPocketsLoading || isMarketsRatesLoading}
				className={styles.converterButton}
			>
				Converter Now
			</button>
		</form>
	);
}

MoneyConverter.propTypes = {
	className: PropTypes.string,
};

export default MoneyConverter;

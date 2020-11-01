import React, { useReducer } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MoneyConverterPanel from '../money-converter-panel/MoneyConverterPanel';
import Swap from '../icons/Swap';

import styles from './MoneyConverter.module.css';

const ACTION_TYPES = {
	SET_FROM_CURRENCY: 'SET_FROM_CURRENCY',
	SET_TO_CURRENCY: 'SET_TO_CURRENCY',
	SET_FROM_MONEY_AMOUNT: 'SET_FROM_MONEY_AMOUNT',
	SET_TO_MONEY_AMOUNT: 'SET_TO_MONEY_AMOUNT',
	SWAP_CURRENCIES: 'SWAP_CURRENCIES',
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
	}
}

function MoneyConverter(props) {
	const { className } = props;

	const [state, dispatch] = useReducer(reducer, {
		from: {
			currency: '',
			moneyAmount: '',
		},
		to: {
			currency: '',
			moneyAmount: '',
		},
	});

	const handleChangeFactory = (type) => (event) => {
		dispatch({ type, payload: event.target.value });
	};

	const handleSwapClick = () => {
		dispatch({ type: ACTION_TYPES.SWAP_CURRENCIES });
	};

	return (
		<form
			className={classnames(styles.wrapper, { [className]: className })}
		>
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
			<div>
				<p className={styles.marketRateDescription}>Market Rate</p>
				<p className={styles.marketRateValues}>-</p>
			</div>
			<button className={styles.converterButton}>Converter Now</button>
		</form>
	);
}

MoneyConverter.propTypes = {
	className: PropTypes.string,
};

export default MoneyConverter;

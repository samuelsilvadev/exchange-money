import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { usePocketsContext } from '../../providers/pockets/PocketsProvider';
import Select from '../select/Select';

import stringToDecimal from '../../formatter/stringToDecimal';

import styles from './MoneyConverterPanel.module.css';

function MoneyConverterPanel(props) {
	const {
		label,
		className,
		handlers: {
			currency: currencyHandler,
			moneyAmount: moneyAmountHandler,
		} = {},
		values: {
			currency: currencyValue = '',
			moneyAmount: moneyAmountValue = '',
		} = {},
	} = props;

	const { result: pockets } = usePocketsContext();
	const [moneyInputValue, setMoneyInputValue] = useState(moneyAmountValue);

	useEffect(() => {
		const [firstPocket] = pockets;

		if (!firstPocket) {
			return;
		}

		currencyHandler?.(firstPocket.label);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pockets]);

	useEffect(() => {
		setMoneyInputValue(moneyAmountValue);
	}, [moneyAmountValue]);

	const handleOnChangeMoneyInput = (event) => {
		let value = event.target.value;
		const formattedValue = stringToDecimal(value);

		setMoneyInputValue(formattedValue);
		moneyAmountHandler?.(formattedValue);
	};

	const handleOnCurrencyChange = (event) => {
		const value = event.target.value;

		currencyHandler?.(value);
	};

	return (
		<div className={className}>
			<Select
				className={styles.select}
				label="Currency"
				id={`converter-panel-${label}`}
				onChange={handleOnCurrencyChange}
				onBlur={handleOnCurrencyChange}
				value={currencyValue}
			>
				{pockets.map(({ label }) => {
					return (
						<option value={label} key={label}>
							{label}
						</option>
					);
				})}
			</Select>
			<div className={styles.inputWrapper}>
				<label
					htmlFor={`converter-panel-input-${label}`}
					className={styles.label}
				>
					{label}
				</label>
				<input
					id={`converter-panel-input-${label}`}
					className={styles.input}
					onChange={handleOnChangeMoneyInput}
					value={moneyInputValue}
					type="number"
				/>
			</div>
		</div>
	);
}

MoneyConverterPanel.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	values: PropTypes.shape({
		currency: PropTypes.string,
		moneyAmount: PropTypes.string,
	}),
	handlers: PropTypes.shape({
		currency: PropTypes.func,
		moneyAmount: PropTypes.func,
	}),
};

export default MoneyConverterPanel;

import React from 'react';
import PropTypes from 'prop-types';

import { usePocketsContext } from '../../providers/pockets/PocketsProvider';
import Select from '../select/Select';

import styles from './MoneyConverterPanel.module.css';

function MoneyConverterPanel(props) {
	const {
		label,
		className,
		handlers: {
			currency: currencyHandler,
			moneyAmount: moneyAmountHandler,
		} = {},
		values: { currency: currencyValue, moneyAmount: moneyAmountValue } = {},
	} = props;

	const pockets = usePocketsContext();

	return (
		<div className={className}>
			<Select
				className={styles.select}
				label="Currency"
				id={`converter-panel-${label}`}
				onChange={currencyHandler}
				onBlur={currencyHandler}
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
				<label className={styles.label}>{label}</label>
				<input
					className={styles.input}
					onChange={moneyAmountHandler}
					value={moneyAmountValue}
					type="text"
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

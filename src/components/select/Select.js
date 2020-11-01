import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ArrowDown from '../icons/ArrowDown';

import styles from './Select.module.css';

function Select(props) {
	const { children, id, className, label, onChange, onBlur, value } = props;

	return (
		<div
			className={classnames(styles.selectWrapper, {
				[className]: className,
			})}
		>
			<label className={styles.selectLabel} htmlFor={id}>
				{label}
			</label>
			<div className={styles.selectIconWrapper}>
				<select
					className={styles.select}
					id={id}
					onChange={onChange}
					onBlur={onBlur}
					value={value}
				>
					{children}
				</select>
				<ArrowDown className={styles.selectIcon} />
			</div>
		</div>
	);
}

Select.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};

export default Select;

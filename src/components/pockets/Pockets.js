import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { usePocketsContext } from '../../providers/pockets/PocketsProvider';
import Select from '../select/Select';

import styles from './Pockets.module.css';

function Pockets(props) {
	const { className } = props;

	const { result: pockets } = usePocketsContext();

	const [selectedPocket, setSelectedPocket] = useState(pockets?.[0]);

	useEffect(() => {
		if (pockets.length > 0) {
			const updatedPocket = pockets.find(
				(pocket) => pocket.label === selectedPocket?.label
			);

			setSelectedPocket(updatedPocket ?? pockets[0]);
		}
	}, [pockets, selectedPocket]);

	const handleChange = (event) => {
		const label = event.target.value;

		const nextSelectedPocket = pockets.find(
			(pocket) => pocket.label === label
		);

		setSelectedPocket(nextSelectedPocket);
	};

	return (
		<section
			className={classnames(styles.pockets, { [className]: className })}
		>
			<h1 className={styles.title}>Pockets</h1>
			<Select
				id="pocket"
				label="Pocket"
				className={styles.pocketSelect}
				onBlur={handleChange}
				onChange={handleChange}
			>
				{pockets.map(({ label }) => {
					return (
						<option value={label} key={label}>
							{label}
						</option>
					);
				})}
			</Select>
			<div>
				<p className={styles.pocketBallance}>
					{selectedPocket?.value ?? '-'}
				</p>
				<p className={styles.pocketBallanceDescription}>
					Total Ballance
				</p>
			</div>
		</section>
	);
}

Pockets.propTypes = {
	className: PropTypes.string,
};

export default Pockets;

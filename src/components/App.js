import React from 'react';

import { PocketsProvider } from '../providers/pockets/PocketsProvider';
import Pockets from './pockets/Pockets';
import MoneyConverter from './money-converter/MoneyConverter';

import styles from './App.module.css';

import './index.css';

const App = () => {
	return (
		<PocketsProvider>
			<main className={styles.wrapper}>
				<Pockets className={styles.pocketsWrapper} />
				<MoneyConverter className={styles.exchangeMoneyWrapper} />
			</main>
		</PocketsProvider>
	);
};

export default App;

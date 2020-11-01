import React from 'react';

import { MarketRatesProvider } from '../providers/market-rates/MarketRatesProvider';
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
				<MarketRatesProvider>
					<MoneyConverter className={styles.exchangeMoneyWrapper} />
				</MarketRatesProvider>
			</main>
		</PocketsProvider>
	);
};

export default App;

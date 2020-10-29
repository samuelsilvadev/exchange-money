import React from 'react';

import { PocketsProvider } from '../providers/pockets/PocketsProvider';
import Pockets from './pockets/Pockets';

import styles from './App.module.css';

import './index.css';

const App = () => {
	return (
		<PocketsProvider>
			<main className={styles.wrapper}>
				<Pockets className={styles.pocketsWrapper} />
				<section className={styles.exchangeMoneyWrapper} />
			</main>
		</PocketsProvider>
	);
};

export default App;

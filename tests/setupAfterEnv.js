import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import MutationObserver from 'mutation-observer';

afterEach(cleanup);

global.MutationObserver = MutationObserver;

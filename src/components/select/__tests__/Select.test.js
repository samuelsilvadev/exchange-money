import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Select from '../Select';

describe('<Select />', () => {
	it('should render correctly', () => {
		const { container, getByLabelText, getByText } = render(
			<Select id="color" label="color">
				<option>Red</option>
				<option>Blue</option>
				<option>Green</option>
			</Select>
		);

		expect(getByLabelText('color')).toBeVisible();
		expect(getByText('Red')).toBeInTheDocument();
		expect(getByText('Blue')).toBeInTheDocument();
		expect(getByText('Green')).toBeInTheDocument();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should call `onChange` correctly', () => {
		const handleChange = jest.fn();

		const { getByLabelText } = render(
			<Select id="color" label="color" onChange={handleChange}>
				<option>Red</option>
				<option>Blue</option>
				<option>Green</option>
			</Select>
		);

		const select = getByLabelText('color');

		fireEvent.change(select);

		expect(handleChange).toHaveBeenCalledTimes(1);
	});
});

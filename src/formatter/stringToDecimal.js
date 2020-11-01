const DECIMAL_CASES_FORWARD = 2;
const NUMBER_SEPARATOR = '.';

/**
 * Formats a string value to a decimal number with two places.
 * @param {string} value
 * @returns {string} formattedValue
 */
function stringToDecimal(value) {
	let valueToFormat = value;

	const separatorIndex = valueToFormat.indexOf(NUMBER_SEPARATOR);

	if (separatorIndex !== -1) {
		valueToFormat = valueToFormat.substring(
			0,
			separatorIndex + DECIMAL_CASES_FORWARD + 1
		);
	}

	return valueToFormat;
}

export default stringToDecimal;

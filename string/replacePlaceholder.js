/**
 * Replace the placeholders with the given parameters in a string.
 * e.g. replacePlaceholder('$0$$$1$$2', ['a', 'b', 'c'], '$') -> 'a$b$2'
 * @param {string} str The string with placeholders to be replaced.
 * @param {string[]} params The parameters to replace the placeholders.
 * @param {string} marker The marker used to mark the placeholders. 2 continuous markers is the escape sequence which represents keeping 1 original marker.
 * @returns {string} The new string that the placeholders are replaced.
 */
function replacePlaceholder(str, params, marker = '$') {
	const parts = str.split(marker + marker);
	parts.forEach((part, i) => {
		parts[i] = replacePlaceholderRecurse(part, params, marker, 0);
	});
	return parts.join(marker);
}

function replacePlaceholderRecurse(str, params, marker, level) {
	const arr = str.split(marker + level);
	if (level + 1 < params.length)
		arr.forEach((element, index) => arr[index] = replacePlaceholderRecurse(element, params, marker, level + 1));
	return arr.join(params[level]);
}

/**
 * Replace the placeholders with the given parameters in a string.
 * e.g. replacePlaceholder('$0$$$1$$2', ['a', 'b', 'c'], '$') -> 'a$b$2'
 * e.g. replacePlaceholder('$i$$$j$$k', {i: 'a', j: 'b', k: 'c'}, '$') -> 'a$b$k'
 * @param {string} str The string with placeholders to be replaced.
 * @param {string[]} map The map used to replace the placeholders.
 * @param {string} marker The marker used to mark the placeholders. 2 continuous markers is the escape sequence which represents keeping 1 original marker.
 * @returns {string} The result string that the placeholders are replaced.
 */
function replacePlaceholder(str, map, marker = '$') {
    const parts = str.split(marker + marker);
    parts.forEach((part, i) => {
        parts[i] = replacePlaceholderRecurse(part, map, marker, 0);
    });
    return parts.join(marker);
}

function replacePlaceholderRecurse(str, map, marker, level) {
    const parts = str.split(marker + Object.keys(map)[level]);
    if (level + 1 < Object.keys(map).length)
        parts.forEach((part, i) => parts[i] = replacePlaceholderRecurse(part, map, marker, level + 1));
    return parts.join(map[Object.keys(map)[level]]);
}

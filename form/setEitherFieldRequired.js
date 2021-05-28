/**
 * Set either of multiple input fields to be required.
 * @param {NodeListOf<HTMLElement>|HTMLCollectionOf<Element>|HTMLElement[]} fields The input fields.
 * @param {boolean} mutuallyExclusive Whether only 1 of the fields can be inputted.
 */
function setEitherFieldRequired(fields, mutuallyExclusive = false) {
    for (let field of fields) {
        field.addEventListener('input', function() {
            updateRequired(fields);
            if (mutuallyExclusive) {
                hasInput = false;
                if (field.getAttribute('type') == 'radio' || field.getAttribute('type') == 'checkbox') {
                    for (let field2 of fields)
                        if (field2.getAttribute('name') == field.getAttribute('name') && field2.hasAttribute('checked')) {
                            hasInput = true;
                            break;
                        }
                } else if (field.value)
                    hasInput = true;
                if (hasInput) {
                    for (let field2 of fields)
                        if (field2.getAttribute('name') != field.getAttribute('name'))
                            field2.setAttribute('disabled', '');
                } else
                    for (let field2 of fields)
                        field2.removeAttribute('disabled');
            }
        });
    }
    updateRequired(fields);
}

function updateRequired(fields) {
    let hasInput = false;
    for (let field of fields)
        if (field.getAttribute('type') == 'radio' || field.getAttribute('type') == 'checkbox') {
            if (field.hasAttribute('checked')) {
                hasInput = true;
                break;
            }
        } else if (field.value) {
            hasInput = true;
            break;
        }
    if (hasInput)
        for (let field of fields)
            field.removeAttribute('required');
    else
        for (let field of fields)
            field.setAttribute('required', '');
}
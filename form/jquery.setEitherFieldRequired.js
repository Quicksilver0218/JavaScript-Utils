/**
 * Set either of multiple input fields to be required.
 * @param {object} fields The input fields, in JQuery object.
 * @param {boolean} mutuallyExclusive Whether only 1 of the fields can be inputted.
 */
function setEitherFieldRequired(fields, mutuallyExclusive = false) {
    fields.on('input', function() {
        updateRequired(fields);
        if (mutuallyExclusive) {
            let hasValue = false;
            if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox')
                hasValue = $('[name="' + $(this).attr('name') + '"][checked]').length > 0;
            else if ($(this).val())
                hasValue = true;
            if (hasValue)
                fields.not('[name="' + $(this).attr('name') + '"]').prop('disabled', true);
            else
                fields.prop('disabled', false);
        }
    });
    updateRequired(fields);
}

function updateRequired(fields) {
    if (fields.filter(function() {
        if ($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox')
            return $(this).prop('checked');
        return $(this).val();
    }).length > 0)
        fields.prop('required', false);
    else
        fields.prop('required', true);
}
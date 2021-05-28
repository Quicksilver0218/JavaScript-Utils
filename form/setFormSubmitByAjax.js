/**
 * Make a form to be submitted by using AJAX instead of submitted normally.
 * @param {HTMLFormElement} form An HTML \<form> element.
 * @param {object} options An object including the handlers to handle form submission.
 * @param {function(form) : boolean} [options.beforeSend] A function to be run before submitting the form. If false is returned, the submission will be cancelled.
 * @param {function(Response) : void} [options.success] The callback to execute when a response is recieved. Responses with HTTP error also goes here.
 * @param {function(reason) : void} [options.fail] The callback to execute when the form is failed to be submitted.
 * @param {function() : void} [options.complete] The callback to execute finally after success or fail.
 */
function setFormSubmitByAjax(form, options = {}) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!form.checkValidity())
            return;
        if (typeof options.beforeSend === 'function')
            if (options.beforeSend(form) === false)
                return;
        const formData = new FormData(form);
        const method = form.getAttribute('method')?.toUpperCase() || 'GET';
        const enctype = form.getAttribute('enctype') || 'application/x-www-form-urlencoded';
        const queryString = new URLSearchParams(formData).toString();
        const url = (form.getAttribute('action') || window.location.href) + method == 'GET'? '?' + queryString : '';
        const init = { method };
        if (method != 'GET')
            switch (enctype) {
                case 'multipart/form-data':
                    init.body = formData;
                    break;
                case 'application/json':
                    init.headers = {
                        'Content-Type': 'application/json'
                    };
                    let object = {};
                    formData.forEach((value, key) => {
                        if (!Reflect.has(object, key)) {
                            object[key] = value;
                            return;
                        }
                        if (!Array.isArray(object[key]))
                            object[key] = [object[key]];
                        object[key].push(value);
                    });
                    init.body = JSON.stringify(object);
                    break;
                default:
                    init.headers = {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    };
                    init.body = queryString;
                    break;
            }
        const promise = fetch(url, init);
        promise.then(res => {
            if (typeof options.success === 'function')
                options.success(res);
        });
        promise.catch(reason => {
            if (typeof options.fail === 'function')
                options.fail(reason);
        });
        promise.finally(() => {
            if (typeof options.complete === 'function')
                options.complete();
        });
    });
}
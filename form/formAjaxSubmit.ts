// This script is for React only. For the common JS version, let's see setFormSubmitByAjax.js.
import { FormEvent } from "react";

export const onSubmit = (e: FormEvent, options: { beforeSend?: (form: HTMLFormElement) => (void | false), success?: (res: Response) => void, fail?: (err: Error) => void, complete?: () => void } = {}) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity())
        return;
    if (typeof options.beforeSend === 'function')
        if (options.beforeSend(form) === false)
            return;
    const formData = new FormData(form);
    const method = form.getAttribute('method')?.toUpperCase() || 'GET';
    const enctype = form.getAttribute('enctype') || 'application/x-www-form-urlencoded';
    const queryString = new URLSearchParams(formData as any).toString();
    const url = (form.getAttribute('action') || window.location.href) + method == 'GET'? '?' + queryString : '';
    const init: RequestInit = { method };
    if (method != 'GET')
        switch (enctype) {
            case 'multipart/form-data':
                init.body = formData;
                break;
            case 'application/json':
                init.headers = {
                    'Content-Type': 'application/json'
                };
                const object: {[key: string]: any} = {};
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
}

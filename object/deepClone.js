/**
 * Create a deep clone of an object.
 * @param inObject The object to be cloned.
 * @returns The new object if `inObject` is an object, otherwise `inObject`.
 */
function deepClone(inObject) {
    if (typeof inObject !== "object" || inObject === null)
        return inObject;
    let outObject = Array.isArray(inObject) ? [] : {};
    for (let key in inObject)
        outObject[key] = deepClone(inObject[key]);
    return outObject;
}

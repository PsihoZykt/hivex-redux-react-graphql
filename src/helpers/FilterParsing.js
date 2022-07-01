export function getKeysArrFromObject(obj) {
    const isObject = val =>
        val && typeof val === 'object' && !Array.isArray(val);

    const addDelimiter = (a, b) =>
        a ? `${a}.${b}` : b;

    const paths = (obj = {}, head = '') => {
        return Object.entries(obj)
            .reduce((product, [key, value]) => {
                let fullPath = addDelimiter(head, key)
                return isObject(value) ?
                    product.concat(paths(value, fullPath))
                    : product.concat(fullPath)
            }, []);
    }

    return paths(obj);
}

export function getKeysAndValuesFromObject(obj, values=[]) {
    for (var key in obj) {
        if (typeof obj[key] === "object") {
            getKeysAndValuesFromObject(obj[key], values);
        } else {
            values.push({key: Object.keys(obj).find(key => obj[key] === obj[key]), value: obj[key] });
        }
    }
    return values
}
export function toDotList(obj) {
    function walk(into, obj, prefix = []) {
        Object.entries(obj).forEach(([key, val]) => {
            if (typeof val === "object" && !Array.isArray(val)) walk(into, val, [...prefix, key]);
            else into[[...prefix, key].join(".")] = val;
        });
    }
    const out = {};
    walk(out, obj);
    return out;
}
export function set(key, val) {
    let value;
    try {
        value = JSON.stringify(val);
    } catch (e) {
        value = val;
    }
    return localStorage.setItem(key, value);
}

export function get(key) {
    let value;
    const val = localStorage.getItem(key);
    try {
        value = JSON.parse(val);
    } catch (e) {
        value = val;
    }
    return value;
}
export function remove(key) {
    localStorage.removeItem(key);
}
export default {
    get,
    set,
    remove
};

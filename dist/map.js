"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.keys = exports.values = exports.of = exports.set = exports.pop = void 0;
function pop(k) {
    return function (xs) {
        const v = xs.get(k);
        xs.delete(k);
        return v;
    };
}
exports.pop = pop;
function set(k) {
    return function (x) {
        return function (xs) {
            if (xs.has(k))
                xs.delete(k);
            return xs.set(k, x);
        };
    };
}
exports.set = set;
function of(xs) {
    return new Map(xs);
}
exports.of = of;
function values(xs) {
    return xs.values();
}
exports.values = values;
function keys(xs) {
    return xs.keys();
}
exports.keys = keys;
function get(k) {
    return function (xs) {
        return xs.get(k);
    };
}
exports.get = get;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.pop = void 0;
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

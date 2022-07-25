"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = exports.foldl = exports.filter = exports.map = exports.is = void 0;
function is(x) {
    if (x === null || x === undefined)
        return false;
    else
        return typeof x[Symbol.iterator] === 'function';
}
exports.is = is;
function map(f) {
    return function* (xs) {
        for (const x of xs)
            yield f(x);
    };
}
exports.map = map;
function filter(f) {
    return function* (xs) {
        for (const x of xs)
            if (f(x))
                yield x;
    };
}
exports.filter = filter;
function foldl(f, i) {
    return function (xs) {
        let a = i;
        for (const x of xs)
            a = f(a)(x);
        return a;
    };
}
exports.foldl = foldl;
function sort(f) {
    return function (xs) {
        return Array.from(xs).sort(f);
    };
}
exports.sort = sort;

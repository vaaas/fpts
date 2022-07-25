"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.by = exports.sort = exports.bind = exports.filter = exports.map = exports.of = exports.last = exports.first = void 0;
function first(xs) {
    return xs[0];
}
exports.first = first;
function last(xs) {
    return xs[xs.length - 1];
}
exports.last = last;
function of(xs) {
    return Array.from(xs);
}
exports.of = of;
function map(f) {
    return function (xs) {
        return xs.map(f);
    };
}
exports.map = map;
function filter(f) {
    return function (xs) {
        return xs.filter(f);
    };
}
exports.filter = filter;
function bind(f) {
    return function (xs) {
        return xs.flatMap(f);
    };
}
exports.bind = bind;
function sort(f) {
    return function (xs) {
        return of(xs).sort(f);
    };
}
exports.sort = sort;
function by(f) {
    return function (a, b) {
        const fa = f(a);
        const fb = f(b);
        if (fa < fb)
            return -1;
        else if (fa > fb)
            return 1;
        else
            return 0;
    };
}
exports.by = by;

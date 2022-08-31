"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = exports.bind = exports.filter = exports.map = exports.of = exports.last = exports.first = void 0;
/** return the first element of an array */
function first(xs) {
    return xs[0];
}
exports.first = first;
/** return the last element of an array */
function last(xs) {
    return xs[xs.length - 1];
}
exports.last = last;
/** creates a new array from an iterable */
function of(xs) {
    return Array.from(xs);
}
exports.of = of;
/** map implementation for arrays */
function map(f) {
    return function (xs) {
        return xs.map(f);
    };
}
exports.map = map;
/** filter implentation for arrays */
function filter(f) {
    return function (xs) {
        return xs.filter(f);
    };
}
exports.filter = filter;
/** bind / flatMap implentation for arrays */
function bind(f) {
    return function (xs) {
        return xs.flatMap(f);
    };
}
exports.bind = bind;
/** return iterable without any duplicates */
function unique(xs) {
    return Array.from(new Set(xs));
}
exports.unique = unique;

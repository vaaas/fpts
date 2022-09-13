"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tail = exports.uniqueBy = exports.unique = exports.bind = exports.filter = exports.map = exports.of = exports.last = exports.first = void 0;
const duad_1 = require("./duad");
const iter_1 = require("./iter");
const map_1 = require("./map");
const function_1 = require("./function");
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
/** return iterable without any duplicates
 *
 * the key by which an iterable is defined as a duplicate is provided by the function `f`
 */
function uniqueBy(f) {
    return (0, function_1.compose)((0, iter_1.map)((0, duad_1.prefix)(f)), map_1.of, map_1.values, of);
}
exports.uniqueBy = uniqueBy;
/** return every element of an array except the first */
function tail(xs) {
    return xs.slice(1);
}
exports.tail = tail;

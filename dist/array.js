"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.inside = exports.pairs = exports.reverseI = exports.dup = exports.joinWith = exports.head = exports.tail = exports.uniqueBy = exports.unique = exports.bind = exports.filter = exports.map = exports.of = exports.middle = exports.last = exports.first = void 0;
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
function middle(xs) {
    return xs[xs.length >> 1];
}
exports.middle = middle;
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
/** return every element of an array excepd the last */
function head(xs) {
    return xs.slice(0, -1);
}
exports.head = head;
/** join all elements of an array into a string, separated by a delimitter */
function joinWith(s) {
    return function (xs) {
        return xs.join(s);
    };
}
exports.joinWith = joinWith;
function dup(x) {
    return [x, x];
}
exports.dup = dup;
function* reverseI(xs) {
    for (let i = xs.length - 1; i >= 0; i--)
        yield xs[i];
}
exports.reverseI = reverseI;
function* pairs(as, bs) {
    for (const a of as)
        for (const b of bs)
            yield [a, b];
}
exports.pairs = pairs;
const inside = (xs) => (x) => xs.includes(x);
exports.inside = inside;
function pick(xs) {
    return xs[Math.floor(Math.random() * xs.length)];
}
exports.pick = pick;

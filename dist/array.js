"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.outside = exports.inside = exports.pairs = exports.reverseI = exports.dup = exports.joinWith = exports.iter_slice = exports.head = exports.tail = exports.uniqueBy = exports.unique = exports.bind = exports.filter_ip = exports.filter = exports.map_ip = exports.map = exports.of = exports.middle = exports.last = exports.first = void 0;
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
/** transform every element **A** of an array of **As** into an element **B**
 * using the provided function `f` **A** -> **B**
 *
 * returns an array of **Bs**
 *
 * this transformation happens *in place*, mutating the array
 */
function map_ip(f) {
    return function (xs) {
        for (let i = 0; i < xs.length; i++)
            // @ts-expect-error
            xs[i] = f(xs[i]);
        // @ts-expect-error
        return xs;
    };
}
exports.map_ip = map_ip;
/** filter implentation for arrays */
function filter(f) {
    return function (xs) {
        return xs.filter(f);
    };
}
exports.filter = filter;
/** in-place implementation of filter
 *
 * iterates over an array, passing each element to a predicate function
 *
 * if the function returns false, the item is removed from the array **in place, modifying the original array**
 *
 * - `f` — the predicate function, returning true or false
 * - `xs` — the array to operate on
 */
function filter_ip(f) {
    return function (xs) {
        /** index of our current position */
        let i = 0;
        /** known good length */
        let j = 0;
        const len = xs.length;
        while (i < len) {
            const x = xs[i];
            if (f(x)) {
                xs[j] = x;
                j++;
            }
            i++;
        }
        xs.length = j;
        return xs;
    };
}
exports.filter_ip = filter_ip;
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
const iter_slice = (start, end) => function* (xs) {
    const actual_end = Math.min(end, xs.length);
    for (let i = start; i < actual_end; i++)
        yield xs[i];
};
exports.iter_slice = iter_slice;
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
const outside = (xs) => (x) => !xs.includes(x);
exports.outside = outside;
function pick(xs) {
    return xs[Math.floor(Math.random() * xs.length)];
}
exports.pick = pick;

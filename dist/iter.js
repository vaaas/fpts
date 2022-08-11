"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWith = exports.join = exports.last = exports.first = exports.by = exports.sumBy = exports.sum = exports.alphabetically = exports.sort = exports.foldr1 = exports.foldl1 = exports.foldr = exports.foldl = exports.filter = exports.bind = exports.map = exports.is = exports.iter = void 0;
const combinator_1 = require("./combinator");
const maths_1 = require("./maths");
const string_1 = require("./string");
/** get the iterator of any iterable
 * like python's iter
 */
function iter(x) {
    return x[Symbol.iterator]();
}
exports.iter = iter;
/** test if **X** is iterable */
function is(x) {
    if (x === null || x === undefined)
        return false;
    else
        return typeof x[Symbol.iterator] === 'function';
}
exports.is = is;
/** map implementation for iterables
 *
 * given a mapping function **A** → **B**
 * turn a collection of **As** into a collection of **Bs**
 */
function map(f) {
    return function* (xs) {
        for (const x of xs)
            yield f(x);
    };
}
exports.map = map;
/** bind implementation for iterables
 *
 * given a mapping function **A** → **Bs**
 * turn a collection af **As** into a collection of **Bs**
 *
 * in other words, it maps and then flattens the iterable
 */
function bind(f) {
    return function* (xs) {
        for (const x of xs)
            yield* f(x);
    };
}
exports.bind = bind;
/** filter implementation for iterables
 *
 * given a testing function **A** → *boolean* and a collection of **As**
 * generate a new collection of **As** that only contains the elements
 * for which the testing function returns *true*
 */
function filter(f) {
    return function* (xs) {
        for (const x of xs)
            if (f(x))
                yield x;
    };
}
exports.filter = filter;
/** left fold for iterables
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
function foldl(f, i) {
    return function (xs) {
        let a = i;
        for (const x of xs)
            a = f(a)(x);
        return a;
    };
}
exports.foldl = foldl;
/** right fold for iterables
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
function foldr(f, i) {
    return function (xs) {
        let a = i;
        for (const x of xs)
            a = f(x)(a);
        return a;
    };
}
exports.foldr = foldr;
/** left fold for iterables without initial value
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
function foldl1(f, i) {
    return function (xs) {
        const it = iter(xs);
        let a = i;
        let v = it.next();
        if (v.done)
            return a;
        else
            a = v.value;
        v = it.next();
        while (!v.done) {
            a = f(a)(v.value);
            v = it.next();
        }
        return a;
    };
}
exports.foldl1 = foldl1;
/** right fold for iterables without initial value
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
function foldr1(f, i) {
    return function (xs) {
        const it = iter(xs);
        let a = i;
        let v = it.next();
        if (v.done)
            return a;
        else
            a = v.value;
        v = it.next();
        while (!v.done) {
            a = f(v.value)(a);
            v = it.next();
        }
        return a;
    };
}
exports.foldr1 = foldr1;
/** sort an iterable into an array
 *
 * the sorting function (**prev**, **next**) → *number*
 * should return negative if *prev* should be before *next*,
 * positive if *prev* should be after *next*
 * and zero if there should be no change
 */
function sort(f) {
    return function (xs) {
        return Array.from(xs).sort(f);
    };
}
exports.sort = sort;
/** sort an iterable alphabetically, which is the default sort in Javascript */
function alphabetically(x) {
    return Array.from(x).sort();
}
exports.alphabetically = alphabetically;
/** calculate the sum of an iterable */
exports.sum = foldl(maths_1.add, 0);
/** calculate the sum of an iterable
 *
 * the number used for summation is provided by the function **f**.
 * for example, it could extract the property of an object
 */
const sumBy = (f) => foldl((0, combinator_1.D1)(maths_1.add)(f), 0);
exports.sumBy = sumBy;
/** sort an iterable *by* some property, similar to python's key function */
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
/** get the first element of an iterable */
function first(xs) {
    const first = iter(xs).next();
    return first.done
        ? undefined
        : first.value;
}
exports.first = first;
/** get the last element of an iterable
 *
 * note that this requires walking through the entire iterable
 */
function last(xs) {
    let last = undefined;
    for (const x of xs)
        last = x;
    return last;
}
exports.last = last;
/** join an iterable of strings into a single string */
exports.join = foldl(string_1.concat, '');
/** join an iterable of strings into a single string
 * separated by the delimiter **d**
 *
 * if the iterable is empty, always returns an empty string
 */
const joinWith = (d) => foldl1((0, string_1.concatWith)(d), '');
exports.joinWith = joinWith;

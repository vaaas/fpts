"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.into = exports.defaults = exports.foldr = exports.foldl = exports.filterWithKeys = exports.filter = exports.map = exports.values = exports.fromEntries = exports.entries = void 0;
/** return the entries of an object */
function entries(o) {
    return Object.entries(o);
}
exports.entries = entries;
/** generate an object from its entries */
function fromEntries(xs) {
    return Object.fromEntries(xs);
}
exports.fromEntries = fromEntries;
/** return an array of an object's values */
function values(xs) {
    return Object.values(xs);
}
exports.values = values;
/** map implementation for objects
 *
 * given a mapping function **A** → **B** and an object of **As**,
 * return a new object of **Bs**
 */
function map(f) {
    return function (xs) {
        const o = {};
        for (const [k, v] of entries(xs))
            o[k] = f(v);
        return o;
    };
}
exports.map = map;
/** filter implementation for objects
 *
 * given a testing function **A** → *boolean* and an object of **As**
 * return a new object of only the **As** for which the testing function
 * returns *true*
 */
function filter(f) {
    return function (xs) {
        const o = {};
        for (const [k, v] of entries(xs))
            if (f(v))
                o[k] = v;
        return o;
    };
}
exports.filter = filter;
/** filter implentation for objects, based on keys as well as values
 *
 * given a testing function **[K, A]** → *boolean* and an object of **As** with keys **Ks**
 * return a new object of only the **As** for which the testing function
 * returns *true*
 *
 * since the keys are also passed, it is possible to filter based on keys
 */
function filterWithKeys(f) {
    return function (xs) {
        const o = {};
        for (const x of entries(xs))
            if (f(x))
                o[x[0]] = x[1];
        return o;
    };
}
exports.filterWithKeys = filterWithKeys;
/** left fold for objects
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
        for (const x of values(xs))
            a = f(a)(x);
        return a;
    };
}
exports.foldl = foldl;
/** right fold for objects
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
        for (const x of values(xs))
            a = f(x)(a);
        return a;
    };
}
exports.foldr = foldr;
/**
 * Set defaults on an object IN PLACE
 * returns the mutated object
 */
function defaults(x) {
    return function (d) {
        for (const [k, v] of entries(d))
            if (!x.hasOwnProperty(k))
                x[k] = v;
        return x;
    };
}
exports.defaults = defaults;
function into(o) {
    return function (k) {
        return function (x) {
            o[k] = x;
            return o;
        };
    };
}
exports.into = into;

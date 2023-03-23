"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assoc = exports.ofKV = exports.ofV = exports.ofK = exports.len = exports.merge = exports.get = exports.defined = exports.into = exports.clone_into = exports.defaults = exports.foldrWithKeys = exports.foldr = exports.foldlWithKeys = exports.foldl = exports.filterWithKeys = exports.filter = exports.eachWithKeys = exports.mapKeys = exports.map2 = exports.map = exports.values = exports.fromEntries = exports.entries = void 0;
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
function map2(f) {
    return function (g) {
        return function (xs) {
            const o = {};
            for (const [k, v] of entries(xs))
                o[f(k)] = g(v);
            return o;
        };
    };
}
exports.map2 = map2;
function mapKeys(f) {
    return function (xs) {
        const o = {};
        for (const [k, v] of entries(xs))
            o[f(k)] = v;
        return o;
    };
}
exports.mapKeys = mapKeys;
function eachWithKeys(f) {
    return function (xs) {
        for (const [k, v] of entries(xs))
            f(k)(v);
    };
}
exports.eachWithKeys = eachWithKeys;
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
            if (f(x[0])(x[1]))
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
function foldlWithKeys(f, i) {
    return function (xs) {
        let a = i;
        for (const [k, v] of entries(xs))
            a = f(a)(k)(v);
        return a;
    };
}
exports.foldlWithKeys = foldlWithKeys;
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
function foldrWithKeys(f, i) {
    return function (xs) {
        let a = i;
        for (const [k, v] of entries(xs))
            a = f(k)(v)(a);
        return a;
    };
}
exports.foldrWithKeys = foldrWithKeys;
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
function clone_into(source) {
    return function (dest) {
        for (const [k, v] of entries(source))
            dest[k] = v;
        return dest;
    };
}
exports.clone_into = clone_into;
function into(o) {
    return function (k) {
        return function (x) {
            o[k] = x;
            return o;
        };
    };
}
exports.into = into;
/** filter out keys of an object whose values are undefined */
function defined(x) {
    const y = {};
    for (const [k, v] of entries(x))
        if (v !== undefined)
            y[k] = v;
    return y;
}
exports.defined = defined;
function get(k) {
    return function (x) {
        return x[k];
    };
}
exports.get = get;
/** merge two objects into one object */
function merge(a) {
    return function (b) {
        return { ...a, ...b };
    };
}
exports.merge = merge;
/** returns the number of entries any record has */
function len(x) {
    return Object.keys(x).length;
}
exports.len = len;
function ofK(f) {
    return function (xs) {
        const o = {};
        for (const x of xs)
            o[x] = f(x);
        return o;
    };
}
exports.ofK = ofK;
function ofV(f) {
    return function (xs) {
        const o = {};
        for (const x of xs)
            o[f(x)] = x;
        return o;
    };
}
exports.ofV = ofV;
function ofKV(f) {
    return function (g) {
        return function (xs) {
            const o = {};
            for (const x of xs)
                o[f(x)] = g(x);
            return o;
        };
    };
}
exports.ofKV = ofKV;
const assoc = (k) => (v) => (o) => ({ ...o, [k]: v });
exports.assoc = assoc;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = exports.foldr = exports.foldl = exports.filter = exports.map = exports.values = exports.fromEntries = exports.entries = void 0;
function entries(o) {
    return Object.entries(o);
}
exports.entries = entries;
function fromEntries(xs) {
    return Object.fromEntries(xs);
}
exports.fromEntries = fromEntries;
function values(xs) {
    return Object.values(xs);
}
exports.values = values;
function map(f) {
    return function (xs) {
        const o = {};
        for (const [k, v] of entries(xs))
            o[k] = f(v);
        return o;
    };
}
exports.map = map;
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
function foldl(f, i) {
    return function (xs) {
        let a = i;
        for (const x of values(xs))
            a = f(a)(x);
        return a;
    };
}
exports.foldl = foldl;
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

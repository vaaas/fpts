"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumBy = exports.sum = exports.alphabetically = exports.sort = exports.foldl = exports.filter = exports.map = exports.is = void 0;
const combinator_1 = require("./combinator");
const maths_1 = require("./maths");
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
function alphabetically(x) {
    return Array.from(x).sort();
}
exports.alphabetically = alphabetically;
exports.sum = foldl(maths_1.add, 0);
const sumBy = (f) => foldl((0, combinator_1.D1)(maths_1.add)(f), 0);
exports.sumBy = sumBy;

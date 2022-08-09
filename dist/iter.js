"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = exports.last = exports.first = exports.by = exports.sumBy = exports.sum = exports.alphabetically = exports.sort = exports.foldl = exports.filter = exports.map = exports.is = exports.iter = void 0;
const combinator_1 = require("./combinator");
const maths_1 = require("./maths");
const string_1 = require("./string");
function iter(x) {
    return x[Symbol.iterator]();
}
exports.iter = iter;
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
function first(xs) {
    const first = iter(xs).next();
    return first.done
        ? undefined
        : first.value;
}
exports.first = first;
function last(xs) {
    let last = undefined;
    for (const x of xs)
        last = x;
    return last;
}
exports.last = last;
exports.join = foldl(string_1.concat, '');

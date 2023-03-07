"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.same = exports.filter = exports.diff = exports.map = exports.outside = exports.inside = exports.of = void 0;
const of = (x) => new Set(x);
exports.of = of;
const inside = (xs) => (x) => xs.has(x);
exports.inside = inside;
const outside = (xs) => (x) => !xs.has(x);
exports.outside = outside;
const map = (f) => (xs) => {
    const n = new Set();
    for (const x of xs)
        n.add(f(x));
    return n;
};
exports.map = map;
const diff = (as) => (bs) => {
    const n = new Set();
    for (const x of as)
        if (!bs.has(x))
            n.add(x);
    return n;
};
exports.diff = diff;
const filter = (f) => (xs) => {
    const ys = new Set();
    for (const x of xs)
        if (f(x))
            ys.add(x);
    return ys;
};
exports.filter = filter;
/** returns whether set A and set B have the same contents */
const same = (a) => (b) => {
    if (a.size !== b.size)
        return false;
    for (const x of a)
        if (!b.has(x))
            return false;
    return true;
};
exports.same = same;

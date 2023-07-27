"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersect = exports.subset = exports.superset = exports.same = exports.filter = exports.diff = exports.map = exports.outside = exports.inside = exports.of = void 0;
const iter_1 = require("./iter");
const combinator_1 = require("./combinator");
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
    else
        return (0, iter_1.every)((0, exports.inside)(b))(a);
};
exports.same = same;
const superset = (superset) => (subset) => (0, iter_1.every)((0, exports.inside)(superset))(subset);
exports.superset = superset;
exports.subset = (0, combinator_1.C)(exports.superset);
const intersect = (a) => (b) => {
    const c = new Set();
    if (a.size === 0 || b.size === 0)
        return c;
    for (const x of a)
        if (b.has(x))
            c.add(x);
    return c;
};
exports.intersect = intersect;

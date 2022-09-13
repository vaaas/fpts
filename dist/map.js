"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupByN = exports.update = exports.groupBy = exports.get = exports.keys = exports.values = exports.of = exports.set = exports.pop = void 0;
const array_1 = require("./array");
function pop(k) {
    return function (xs) {
        const v = xs.get(k);
        xs.delete(k);
        return v;
    };
}
exports.pop = pop;
function set(k) {
    return function (x) {
        return function (xs) {
            if (xs.has(k))
                xs.delete(k);
            return xs.set(k, x);
        };
    };
}
exports.set = set;
function of(xs) {
    return new Map(xs);
}
exports.of = of;
function values(xs) {
    return xs.values();
}
exports.values = values;
function keys(xs) {
    return xs.keys();
}
exports.keys = keys;
function get(k) {
    return function (xs) {
        return xs.get(k);
    };
}
exports.get = get;
function groupBy(f) {
    return function (xs) {
        const groups = new Map();
        for (const x of xs) {
            const g = f(x);
            if (groups.has(g))
                groups.get(g).push(x);
            else
                groups.set(g, [x]);
        }
        return groups;
    };
}
exports.groupBy = groupBy;
/** **UNSAFE**
 *
 * given a mapping from **A** to **B**, update a Map of **As** into a Map of **Bs** **in place**
 */
function update(f) {
    return function (xs) {
        for (const [k, v] of xs)
            xs.set(k, f(v));
        return xs;
    };
}
exports.update = update;
function groupByN(...fs) {
    return function (xs) {
        if (fs.length === 1)
            return groupBy(fs[0])(xs);
        else
            // @ts-ignore
            return update(groupByN(...(0, array_1.tail)(fs)))(groupBy(fs[0])(xs));
    };
}
exports.groupByN = groupByN;

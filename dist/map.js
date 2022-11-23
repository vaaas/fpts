"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = exports.outside = exports.inside = exports.mapKeys = exports.map2 = exports.map = exports.groupByN = exports.groupBy = exports.update = exports.unsafeGetFrom = exports.unsafeGet = exports.get = exports.keys = exports.values = exports.invert = exports.ofKV = exports.ofK = exports.ofVN = exports.ofV = exports.of = exports.set = exports.pop = void 0;
const array_1 = require("./array");
/** UNSAFE!
 *
 * remove a key from a map and return its value, if it exists
 */
function pop(k) {
    return function (xs) {
        const v = xs.get(k);
        xs.delete(k);
        return v;
    };
}
exports.pop = pop;
/** UNSAFE!
 *
 * set a key to a value in a map
 */
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
/** make a map out of any iterable of tuples */
function of(xs) {
    return new Map(xs);
}
exports.of = of;
/** make a map out of any iterable of values
 *
 * keys are retrieved by the provided function
 */
function ofV(f) {
    return function (xs) {
        const m = new Map();
        for (const x of xs)
            m.set(f(x), x);
        return m;
    };
}
exports.ofV = ofV;
function ofVN(...fs) {
    return function (xs) {
        if (fs.length === 1)
            return ofV(fs[0])(xs);
        else
            // @ts-ignore
            return update(ofVN(...(0, array_1.tail)(fs)))(groupBy(fs[0])(xs));
    };
}
exports.ofVN = ofVN;
/** make a map out of any iterable of keys
 *
 * values are retrieved by the provided function
 */
function ofK(f) {
    return function (xs) {
        const m = new Map();
        for (const x of xs)
            m.set(x, f(x));
        return m;
    };
}
exports.ofK = ofK;
/** make a map out of any iterable
 *
 * keys are retrieved by the first function, and values by the second
 */
function ofKV(f) {
    return function (g) {
        return function (xs) {
            const m = new Map();
            for (const x of xs)
                m.set(f(x), g(x));
            return m;
        };
    };
}
exports.ofKV = ofKV;
/** make a map's keys its values and vice versa */
function invert(xs) {
    const m = new Map();
    for (const [k, v] of xs)
        m.set(v, k);
    return m;
}
exports.invert = invert;
/** retrieve all of a map's values as an iterable */
function values(xs) {
    return xs.values();
}
exports.values = values;
/** retrieve all of a map's keys as an iterable */
function keys(xs) {
    return xs.keys();
}
exports.keys = keys;
/** get a value out of a map using a key */
function get(k) {
    return function (xs) {
        return xs.get(k);
    };
}
exports.get = get;
/** get a value out of a map using a key unsafely (ignoring undefined checks) */
function unsafeGet(k) {
    return function (xs) {
        return xs.get(k);
    };
}
exports.unsafeGet = unsafeGet;
/** get a value out of a map using a key unsafely (ignoring undefined checks) */
function unsafeGetFrom(xs) {
    return function (k) {
        return xs.get(k);
    };
}
exports.unsafeGetFrom = unsafeGetFrom;
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
/** group an iterable of **As** into a Map of **As**, where the keys are the values they are grouped under
 *
 * the key is provided by a key function **f**
 */
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
function map(f) {
    return function (xs) {
        const m = new Map();
        for (const [k, v] of xs)
            m.set(k, f(v));
        return m;
    };
}
exports.map = map;
function map2(f) {
    return function (g) {
        return function (xs) {
            const m = new Map();
            for (const [k, v] of xs)
                m.set(f(k), g(v));
            return m;
        };
    };
}
exports.map2 = map2;
function mapKeys(f) {
    return function (xs) {
        const ys = new Map;
        for (const [k, v] of xs.entries())
            ys.set(f(k), v);
        return ys;
    };
}
exports.mapKeys = mapKeys;
const inside = (xs) => (x) => xs.has(x);
exports.inside = inside;
const outside = (xs) => (x) => !xs.has(x);
exports.outside = outside;
function copy(xs) {
    const ys = new Map();
    for (const pair of xs)
        ys.set(pair[0], pair[1]);
    return ys;
}
exports.copy = copy;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = exports.liftM2 = exports.lift2 = exports.bind = exports.map = exports.partition = exports.fromRight = exports.fromLeft = exports.rights = exports.lefts = exports.either = exports.isRight = exports.isLeft = exports.right = exports.left = void 0;
const data_1 = require("./data");
/** construct a left type */
const left = (x) => [x, data_1.NoValue];
exports.left = left;
/** constructs a right type */
const right = (x) => [data_1.NoValue, x];
exports.right = right;
/** returns `true` if a value is left */
const isLeft = (x) => x[1] === data_1.NoValue;
exports.isLeft = isLeft;
/** returns `true` if a value is right */
const isRight = (x) => x[0] === data_1.NoValue;
exports.isRight = isRight;
/** folds both cases of an either into a single value
 *
 * requires two mappings, one for the left, and one for the right
 */
const either = (l) => (r) => (x) => (0, exports.isLeft)(x) ? l(x[0]) : r(x[1]);
exports.either = either;
/** extracts all the lefts from an iterable */
function* lefts(xs) {
    for (const x of xs)
        if ((0, exports.isLeft)(x))
            yield x[0];
}
exports.lefts = lefts;
/** extracts all the rights from an iterable */
function* rights(xs) {
    for (const x of xs)
        if ((0, exports.isRight)(x))
            yield x[1];
}
exports.rights = rights;
/** unwraps a left value from an either. if the either is a right, use the default value */
const fromLeft = (d) => (x) => (0, exports.isLeft)(x) ? x[0] : d;
exports.fromLeft = fromLeft;
/** unwraps a right value from an either. if the either is a left, use the default value */
const fromRight = (d) => (x) => (0, exports.isRight)(x) ? x[1] : d;
exports.fromRight = fromRight;
/** splits a sequence of eithers into an array of lefts and an array of rights in one step */
function partition(xs) {
    const ls = [];
    const rs = [];
    for (const x of xs)
        if ((0, exports.isLeft)(x))
            ls.push(x[0]);
        else
            rs.push(x[1]);
    return [ls, rs];
}
exports.partition = partition;
/** transforms the right value of an either, leaving the left one intact */
const map = (f) => (x) => (0, exports.isRight)(x) ? [x[0], f(x[1])] : x;
exports.map = map;
/** transforms the right value of an either, leaving the left one intact
 *
 * transformation function returns another either, and is flattened
 */
const bind = (f) => (x) => (0, exports.isRight)(x) ? f(x[1]) : x;
exports.bind = bind;
/** lifts a binary function to accept two eithers */
const lift2 = (f) => (a) => (b) => {
    if ((0, exports.isLeft)(a))
        return a;
    else if ((0, exports.isLeft)(b))
        return b;
    else
        return [data_1.NoValue, f(a[1])(b[1])];
};
exports.lift2 = lift2;
/** lifts a binary function to accept two eithers
 *
 * the function returns another either, and is flattened
 */
const liftM2 = (f) => (a) => (b) => {
    if ((0, exports.isLeft)(a))
        return a;
    else if ((0, exports.isLeft)(b))
        return b;
    else
        return f(a[1])(b[1]);
};
exports.liftM2 = liftM2;
/** flattens a nested either into a single layer */
const flatten = (x) => (0, exports.isLeft)(x) ? x : x[1];
exports.flatten = flatten;

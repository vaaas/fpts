"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = exports.lte = exports.lt = exports.gte = exports.gt = exports.seq = exports.clamp = exports.Grandi = exports.Integers = exports.Naturals = exports.div = exports.mult = exports.add = exports.neg = exports.randint = void 0;
/** return a random integer in the range [a, b) */
function randint(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}
exports.randint = randint;
/** flip the sign of a number */
function neg(x) { return -1 * x; }
exports.neg = neg;
/** add two numbers */
function add(a) {
    return function (b) {
        return a + b;
    };
}
exports.add = add;
/** multiply two numbers */
function mult(a) {
    return function (b) {
        return a * b;
    };
}
exports.mult = mult;
/** divide two numbers */
function div(a) {
    return function (b) {
        return b / a;
    };
}
exports.div = div;
/** the natural numbers. infinite iterable */
function* Naturals() {
    for (let i = 0; true; i++)
        yield i;
}
exports.Naturals = Naturals;
/** the integers. infinite iterable */
function* Integers() {
    for (let i = 0; true; i = neg(i) + (i > 0 ? 0 : 1))
        yield i;
}
exports.Integers = Integers;
/** the grandi series */
function* Grandi() {
    for (let i = 1; true; i = neg(i))
        yield i;
}
exports.Grandi = Grandi;
function clamp(min, max) {
    return function (x) {
        if (x < min)
            return min;
        else if (x > max)
            return max;
        else
            return x;
    };
}
exports.clamp = clamp;
/** create a sequence of integers starting from min and ending in max (inclusive) */
function* seq(min, max) {
    for (let i = min; i <= max; i++)
        yield i;
}
exports.seq = seq;
const gt = (a) => (b) => b > a;
exports.gt = gt;
const gte = (a) => (b) => b >= a;
exports.gte = gte;
const lt = (a) => (b) => b < a;
exports.lt = lt;
const lte = (a) => (b) => b <= a;
exports.lte = lte;
const eq = (a) => (b) => a === b;
exports.eq = eq;

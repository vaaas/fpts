"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seq = exports.clamp = exports.Grandi = exports.Integers = exports.Naturals = exports.mult = exports.add = exports.neg = exports.randint = void 0;
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

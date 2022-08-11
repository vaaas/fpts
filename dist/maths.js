"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mult = exports.add = exports.neg = exports.randint = void 0;
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

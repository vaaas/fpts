"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mult = exports.add = exports.neg = exports.randint = void 0;
function randint(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}
exports.randint = randint;
function neg(x) { return -1 * x; }
exports.neg = neg;
function add(a) {
    return function (b) {
        return a + b;
    };
}
exports.add = add;
function mult(a) {
    return function (b) {
        return a * b;
    };
}
exports.mult = mult;

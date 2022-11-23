"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flip = exports.suffix = exports.prefix = exports.duad = exports.of = void 0;
const of = (a, b) => [a, b];
exports.of = of;
const duad = (a) => (b) => [a, b];
exports.duad = duad;
function prefix(f) {
    return function (x) {
        return [f(x), x];
    };
}
exports.prefix = prefix;
function suffix(f) {
    return function (x) {
        return [x, f(x)];
    };
}
exports.suffix = suffix;
function flip(x) {
    return [x[1], x[0]];
}
exports.flip = flip;

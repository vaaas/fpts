"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapl = exports.mapr = exports.flip = exports.suffix = exports.prefix = exports.duad = exports.of = void 0;
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
function mapr(f) {
    return function (xs) {
        return [xs[0], f(xs[1])];
    };
}
exports.mapr = mapr;
function mapl(f) {
    return function (xs) {
        return [f(xs[0]), xs[1]];
    };
}
exports.mapl = mapl;

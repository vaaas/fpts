"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightAs = exports.leftAs = exports.right = exports.left = exports.into = exports.map2 = exports.mapr = exports.mapl = exports.suffix = exports.prefix = exports.duad = exports.of = void 0;
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
/** map for duads for the left value */
function mapl(f) {
    return function (x) {
        return [f(left(x)), right(x)];
    };
}
exports.mapl = mapl;
/** map for duads for the right value */
function mapr(f) {
    return function (x) {
        return [left(x), f(right(x))];
    };
}
exports.mapr = mapr;
function map2(f) {
    return function (g) {
        return function (x) {
            return [f(left(x)), g(right(x))];
        };
    };
}
exports.map2 = map2;
/** apply the two values of a duad to a binary function */
function into(f) {
    return function (x) {
        return f(left(x))(right(x));
    };
}
exports.into = into;
function left(x) {
    return x[0];
}
exports.left = left;
function right(x) {
    return x[1];
}
exports.right = right;
function leftAs(f) {
    return function (x) {
        return f(left(x));
    };
}
exports.leftAs = leftAs;
function rightAs(f) {
    return function (x) {
        return f(right(x));
    };
}
exports.rightAs = rightAs;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outside = exports.inside = exports.of = void 0;
const of = (x) => new Set(x);
exports.of = of;
const inside = (xs) => (x) => xs.has(x);
exports.inside = inside;
const outside = (xs) => (x) => !xs.has(x);
exports.outside = outside;

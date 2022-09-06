"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bind = exports.map = exports.sleep = exports.next_tick = exports.next_frame = void 0;
function next_frame() {
    return new Promise((yes) => {
        requestAnimationFrame(() => yes());
    });
}
exports.next_frame = next_frame;
function next_tick() {
    return new Promise((yes) => yes());
}
exports.next_tick = next_tick;
function sleep(n) {
    return new Promise(yes => setTimeout(() => yes(), n));
}
exports.sleep = sleep;
function map(f) {
    return function (x) {
        return x.then(f);
    };
}
exports.map = map;
function bind(f) {
    return function (x) {
        return x.then(f);
    };
}
exports.bind = bind;

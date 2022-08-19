"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.next_tick = exports.next_frame = void 0;
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.before = exports.after = exports.timestamp = exports.mapDay = exports.mapYear = exports.mapMonth = void 0;
const mapMonth = (f) => (x) => {
    const y = new Date(x);
    y.setMonth(f(y.getMonth()));
    return y;
};
exports.mapMonth = mapMonth;
const mapYear = (f) => (x) => {
    const y = new Date(x);
    y.setFullYear(f(y.getFullYear()));
    return y;
};
exports.mapYear = mapYear;
const mapDay = (f) => (x) => {
    const y = new Date(x);
    y.setDate(f(y.getDate()));
    return y;
};
exports.mapDay = mapDay;
const timestamp = (x) => x.getTime();
exports.timestamp = timestamp;
const after = (a) => (b) => b.getTime() > a.getTime();
exports.after = after;
const before = (a) => (b) => b.getTime() < a.getTime();
exports.before = before;

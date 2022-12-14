"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rights = exports.lefts = void 0;
const iter_1 = require("./iter");
exports.lefts = (0, iter_1.map)((x) => x[0]);
exports.rights = (0, iter_1.map)((x) => x[1]);

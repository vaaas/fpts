"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatWith = exports.concat = void 0;
/** join two strings into a single string */
const concat = a => b => a + b;
exports.concat = concat;
/** join two strings into a single string
 * delimitting them with **d**
 */
const concatWith = d => a => b => a + d + b;
exports.concatWith = concatWith;

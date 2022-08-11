"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_json_parse = exports.NoValue = void 0;
/** represents the abscence of value */
exports.NoValue = Symbol('represents absence of any value');
/** parse json without throwing errors
 *
 * if the JSON data is invalid, simply returns *undefined*
 */
function safe_json_parse(x) {
    try {
        return JSON.parse(x);
    }
    catch (e) {
        return undefined;
    }
}
exports.safe_json_parse = safe_json_parse;

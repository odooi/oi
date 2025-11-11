/** @oi-module */
// @ts-check

import { helpers } from "@oi/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/** @typedef {import("@oi/o-spreadsheet").Token} Token */

/**
 * Parse a spreadsheet formula and detect the number of LIST functions that are
 * present in the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {number}
 */
export function getNumberOfListFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["OI.LIST", "OI.LIST.HEADER"]).length;
}

/**
 * Get the first List function description of the given formula.
 *
 * @param {Token[]} tokens
 *
 * @returns {import("../helpers/oi_functions_helpers").OiFunctionDescription|undefined}
 */
export function getFirstListFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["OI.LIST", "OI.LIST.HEADER"])[0];
}

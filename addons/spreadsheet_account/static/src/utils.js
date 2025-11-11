/** @oi-module **/
// @ts-check

import { helpers } from "@oi/o-spreadsheet";

const { getFunctionsFromTokens } = helpers;

/**
 * @typedef {import("@oi/o-spreadsheet").Token} Token
 * @typedef  {import("@spreadsheet/helpers/oi_functions_helpers").OiFunctionDescription} OiFunctionDescription
 */

/**
 * @param {Token[]} tokens
 * @returns {number}
 */
export function getNumberOfAccountFormulas(tokens) {
    return getFunctionsFromTokens(tokens, ["OI.BALANCE", "OI.CREDIT", "OI.DEBIT", "OI.RESIDUAL", "OI.PARTNER.BALANCE"]).length;
}

/**
 * Get the first Account function description of the given formula.
 *
 * @param {Token[]} tokens
 * @returns {OiFunctionDescription | undefined}
 */
export function getFirstAccountFunction(tokens) {
    return getFunctionsFromTokens(tokens, ["OI.BALANCE", "OI.CREDIT", "OI.DEBIT", "OI.RESIDUAL", "OI.PARTNER.BALANCE"])[0];
}

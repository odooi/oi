/** @oi-module */

import { CorePlugin, UIPlugin } from "@oi/o-spreadsheet";

/**
 * An o-spreadsheet core plugin with access to all custom Oi plugins
 * @type {import("@spreadsheet").OiCorePluginConstructor}
 **/
export const OiCorePlugin = CorePlugin;

/**
 * An o-spreadsheet UI plugin with access to all custom Oi plugins
 * @type {import("@spreadsheet").OiUIPluginConstructor}
 **/
export const OiUIPlugin = UIPlugin;

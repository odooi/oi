import { CorePlugin, Model, UID } from "@oi/o-spreadsheet";
import { ChartOiMenuPlugin, OiChartCorePlugin, OiChartUIPlugin } from "@spreadsheet/chart";
import { CurrencyPlugin } from "@spreadsheet/currency/plugins/currency";
import { AccountingPlugin } from "addons/spreadsheet_account/static/src/plugins/accounting_plugin";
import { GlobalFiltersCorePlugin, GlobalFiltersUIPlugin } from "@spreadsheet/global_filters";
import { ListCorePlugin, ListUIPlugin } from "@spreadsheet/list";
import { IrMenuPlugin } from "@spreadsheet/ir_ui_menu/ir_ui_menu_plugin";
import { PivotOiCorePlugin } from "@spreadsheet/pivot";
import { PivotCoreGlobalFilterPlugin } from "@spreadsheet/pivot/plugins/pivot_core_global_filter_plugin";

type Getters = Model["getters"];
type CoreGetters = CorePlugin["getters"];

/**
 * Union of all getter names of a plugin.
 *
 * e.g. With the following plugin
 * @example
 * class MyPlugin {
 *   static getters = [
 *     "getCell",
 *     "getCellValue",
 *   ] as const;
 *   getCell() { ... }
 *   getCellValue() { ... }
 * }
 * type Names = GetterNames<typeof MyPlugin>
 * // is equivalent to "getCell" | "getCellValue"
 */
type GetterNames<Plugin extends { getters: readonly string[] }> = Plugin["getters"][number];

/**
 * Extract getter methods from a plugin, based on its `getters` static array.
 * @example
 * class MyPlugin {
 *   static getters = [
 *     "getCell",
 *     "getCellValue",
 *   ] as const;
 *   getCell() { ... }
 *   getCellValue() { ... }
 * }
 * type MyPluginGetters = PluginGetters<typeof MyPlugin>;
 * // MyPluginGetters is equivalent to:
 * // {
 * //   getCell: () => ...,
 * //   getCellValue: () => ...,
 * // }
 */
type PluginGetters<Plugin extends { new (...args: unknown[]): any; getters: readonly string[] }> =
    Pick<InstanceType<Plugin>, GetterNames<Plugin>>;

declare module "@spreadsheet" {
    /**
     * Add getters from custom plugins defined in oi
     */

    interface OiCoreGetters extends CoreGetters {}
    interface OiCoreGetters extends PluginGetters<typeof GlobalFiltersCorePlugin> {}
    interface OiCoreGetters extends PluginGetters<typeof ListCorePlugin> {}
    interface OiCoreGetters extends PluginGetters<typeof OiChartCorePlugin> {}
    interface OiCoreGetters extends PluginGetters<typeof ChartOiMenuPlugin> {}
    interface OiCoreGetters extends PluginGetters<typeof IrMenuPlugin> {}
    interface OiCoreGetters extends PluginGetters<typeof PivotOiCorePlugin> {}
    interface OiCoreGetters extends PluginGetters<typeof PivotCoreGlobalFilterPlugin> {}

    interface OiGetters extends Getters {}
    interface OiGetters extends OiCoreGetters {}
    interface OiGetters extends PluginGetters<typeof GlobalFiltersUIPlugin> {}
    interface OiGetters extends PluginGetters<typeof ListUIPlugin> {}
    interface OiGetters extends PluginGetters<typeof OiChartUIPlugin> {}
    interface OiGetters extends PluginGetters<typeof CurrencyPlugin> {}
    interface OiGetters extends PluginGetters<typeof AccountingPlugin> {}
}

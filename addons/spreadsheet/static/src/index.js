/** @oi-module */

/**
 * This file is meant to load the different subparts of the module
 * to guarantee their plugins are loaded in the right order
 *
 * dependency:
 *             other plugins
 *                   |
 *                  ...
 *                   |
 *                filters
 *                /\    \
 *               /  \    \
 *           pivot  list  Oi chart
 */

/** TODO: Introduce a position parameter to the plugin registry in order to load them in a specific order */
import * as spreadsheet from "@oi/o-spreadsheet";
const { corePluginRegistry, coreViewsPluginRegistry } = spreadsheet.registries;

import { GlobalFiltersCorePlugin, GlobalFiltersUIPlugin } from "@spreadsheet/global_filters/index";
import { PivotOiCorePlugin, PivotUIGlobalFilterPlugin } from "@spreadsheet/pivot/index"; // list depends on filter for its getters
import { ListCorePlugin, ListUIPlugin } from "@spreadsheet/list/index"; // pivot depends on filter for its getters
import {
    ChartOiMenuPlugin,
    OiChartCorePlugin,
    OiChartUIPlugin,
} from "@spreadsheet/chart/index"; // Oichart depends on filter for its getters
import { PivotCoreGlobalFilterPlugin } from "./pivot/plugins/pivot_core_global_filter_plugin";
import { PivotOiUIPlugin } from "./pivot/plugins/pivot_oi_ui_plugin";

corePluginRegistry.add("OiGlobalFiltersCorePlugin", GlobalFiltersCorePlugin);
corePluginRegistry.add("PivotOiCorePlugin", PivotOiCorePlugin);
corePluginRegistry.add("OiPivotGlobalFiltersCorePlugin", PivotCoreGlobalFilterPlugin);
corePluginRegistry.add("OiListCorePlugin", ListCorePlugin);
corePluginRegistry.add("oiChartCorePlugin", OiChartCorePlugin);
corePluginRegistry.add("chartOiMenuPlugin", ChartOiMenuPlugin);

coreViewsPluginRegistry.add("OiGlobalFiltersUIPlugin", GlobalFiltersUIPlugin);
coreViewsPluginRegistry.add("OiPivotGlobalFilterUIPlugin", PivotUIGlobalFilterPlugin);
coreViewsPluginRegistry.add("OiListUIPlugin", ListUIPlugin);
coreViewsPluginRegistry.add("oiChartUIPlugin", OiChartUIPlugin);
coreViewsPluginRegistry.add("oiPivotUIPlugin", PivotOiUIPlugin);

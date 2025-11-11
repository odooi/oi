/** @oi-module */

import * as spreadsheet from "@oi/o-spreadsheet";

const { chartComponentRegistry } = spreadsheet.registries;
const { ChartJsComponent } = spreadsheet.components;

chartComponentRegistry.add("oi_bar", ChartJsComponent);
chartComponentRegistry.add("oi_line", ChartJsComponent);
chartComponentRegistry.add("oi_pie", ChartJsComponent);

import { OiChartCorePlugin } from "./plugins/oi_chart_core_plugin";
import { ChartOiMenuPlugin } from "./plugins/chart_oi_menu_plugin";
import { OiChartUIPlugin } from "./plugins/oi_chart_ui_plugin";

export { OiChartCorePlugin, ChartOiMenuPlugin, OiChartUIPlugin };

/** @oi-module */

import { OiCorePlugin } from "@spreadsheet/plugins";
import { coreTypes, helpers } from "@oi/o-spreadsheet";
import { omit } from "@web/core/utils/objects";
const { deepEquals } = helpers;

/** Plugin that link charts with Oi menus. It can contain either the Id of the oi menu, or its xml id. */
export class ChartOiMenuPlugin extends OiCorePlugin {
    static getters = /** @type {const} */ (["getChartOiMenu"]);
    constructor(config) {
        super(config);
        this.oiMenuReference = {};
    }

    /**
     * Handle a spreadsheet command
     * @param {Object} cmd Command
     */
    handle(cmd) {
        switch (cmd.type) {
            case "LINK_OI_MENU_TO_CHART":
                this.history.update("oiMenuReference", cmd.chartId, cmd.oiMenuId);
                break;
            case "DELETE_FIGURE":
                this.history.update("oiMenuReference", cmd.id, undefined);
                break;
            case "DUPLICATE_SHEET":
                this.updateOnDuplicateSheet(cmd.sheetId, cmd.sheetIdTo);
                break;
        }
    }

    updateOnDuplicateSheet(sheetIdFrom, sheetIdTo) {
        for (const oldChartId of this.getters.getChartIds(sheetIdFrom)) {
            if (!this.oiMenuReference[oldChartId]) {
                continue;
            }
            const oldChartDefinition = this.getters.getChartDefinition(oldChartId);
            const oldFigure = this.getters.getFigure(sheetIdFrom, oldChartId);
            const newChartId = this.getters.getChartIds(sheetIdTo).find((newChartId) => {
                const newChartDefinition = this.getters.getChartDefinition(newChartId);
                const newFigure = this.getters.getFigure(sheetIdTo, newChartId);
                return (
                    deepEquals(oldChartDefinition, newChartDefinition) &&
                    deepEquals(omit(newFigure, "id"), omit(oldFigure, "id")) // compare size and position
                );
            });

            if (newChartId) {
                this.history.update(
                    "oiMenuReference",
                    newChartId,
                    this.oiMenuReference[oldChartId]
                );
            }
        }
    }

    /**
     * Get oi menu linked to the chart
     *
     * @param {string} chartId
     * @returns {object | undefined}
     */
    getChartOiMenu(chartId) {
        const menuId = this.oiMenuReference[chartId];
        return menuId ? this.getters.getIrMenu(menuId) : undefined;
    }

    import(data) {
        if (data.chartOiMenusReferences) {
            this.oiMenuReference = data.chartOiMenusReferences;
        }
    }

    export(data) {
        data.chartOiMenusReferences = this.oiMenuReference;
    }
}

coreTypes.add("LINK_OI_MENU_TO_CHART");

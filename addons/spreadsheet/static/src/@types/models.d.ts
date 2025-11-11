declare module "@spreadsheet" {
    import { Model } from "@oi/o-spreadsheet";

    export interface OiSpreadsheetModel extends Model {
        getters: OiGetters;
        dispatch: OiDispatch;
    }

    export interface OiSpreadsheetModelConstructor {
        new (
            data: object,
            config: Partial<Model["config"]>,
            revisions: object[]
        ): OiSpreadsheetModel;
    }
}

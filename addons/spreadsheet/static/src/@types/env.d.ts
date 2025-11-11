import { SpreadsheetChildEnv as SSChildEnv } from "@oi/o-spreadsheet";
import { Services } from "services";

declare module "@spreadsheet" {
    import { Model } from "@oi/o-spreadsheet";

    export interface SpreadsheetChildEnv extends SSChildEnv {
        model: OiSpreadsheetModel;
        services: Services;
    }
}

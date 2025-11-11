declare module "@spreadsheet" {
    import { CommandResult, CorePlugin, UIPlugin } from "@oi/o-spreadsheet";
    import { CommandResult as CR } from "@spreadsheet/o_spreadsheet/cancelled_reason";
    type OiCommandResult = CommandResult | typeof CR;

    export interface OiCorePlugin extends CorePlugin {
        getters: OiCoreGetters;
        dispatch: OiCoreDispatch;
        allowDispatch(command: AllCoreCommand): string | string[];
        beforeHandle(command: AllCoreCommand): void;
        handle(command: AllCoreCommand): void;
    }

    export interface OiCorePluginConstructor {
        new (config: unknown): OiCorePlugin;
    }

    export interface OiUIPlugin extends UIPlugin {
        getters: OiGetters;
        dispatch: OiDispatch;
        allowDispatch(command: AllCommand): string | string[];
        beforeHandle(command: AllCommand): void;
        handle(command: AllCommand): void;
    }

    export interface OiUIPluginConstructor {
        new (config: unknown): OiUIPlugin;
    }
}

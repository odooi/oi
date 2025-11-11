import { FieldMatching } from "./global_filter.d";
import {
    CorePlugin,
    UIPlugin,
    DispatchResult,
    CommandResult,
    AddPivotCommand,
    UpdatePivotCommand,
    CancelledReason,
} from "@oi/o-spreadsheet";
import * as OiCancelledReason from "@spreadsheet/o_spreadsheet/cancelled_reason";

type CoreDispatch = CorePlugin["dispatch"];
type UIDispatch = UIPlugin["dispatch"];
type CoreCommand = Parameters<CorePlugin["allowDispatch"]>[0];
type Command = Parameters<UIPlugin["allowDispatch"]>[0];

// TODO look for a way to remove this and use the real import * as OiCancelledReason
type OiCancelledReason = string;

declare module "@spreadsheet" {
    interface OiCommandDispatcher {
        dispatch<T extends OiCommandTypes, C extends Extract<OiCommand, { type: T }>>(
            type: {} extends Omit<C, "type"> ? T : never
        ): OiDispatchResult;
        dispatch<T extends OiCommandTypes, C extends Extract<OiCommand, { type: T }>>(
            type: T,
            r: Omit<C, "type">
        ): OiDispatchResult;
    }

    interface OiCoreCommandDispatcher {
        dispatch<T extends OiCoreCommandTypes, C extends Extract<OiCoreCommand, { type: T }>>(
            type: {} extends Omit<C, "type"> ? T : never
        ): OiDispatchResult;
        dispatch<T extends OiCoreCommandTypes, C extends Extract<OiCoreCommand, { type: T }>>(
            type: T,
            r: Omit<C, "type">
        ): OiDispatchResult;
    }

    interface OiDispatchResult extends DispatchResult {
        readonly reasons: (CancelledReason | OiCancelledReason)[];
        isCancelledBecause(reason: CancelledReason | OiCancelledReason): boolean;
    }

    type OiCommandTypes = OiCommand["type"];
    type OiCoreCommandTypes = OiCoreCommand["type"];

    type OiDispatch = UIDispatch & OiCommandDispatcher["dispatch"];
    type OiCoreDispatch = CoreDispatch & OiCoreCommandDispatcher["dispatch"];

    // CORE

    export interface ExtendedAddPivotCommand extends AddPivotCommand {
        pivot: ExtendedPivotCoreDefinition;
    }

    export interface ExtendedUpdatePivotCommand extends UpdatePivotCommand {
        pivot: ExtendedPivotCoreDefinition;
    }

    export interface AddThreadCommand {
        type: "ADD_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
    }

    export interface EditThreadCommand {
        type: "EDIT_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
        isResolved: boolean;
    }

    export interface DeleteThreadCommand {
        type: "DELETE_COMMENT_THREAD";
        threadId: number;
        sheetId: string;
        col: number;
        row: number;
    }

    // this command is deprecated. use UPDATE_PIVOT instead
    export interface UpdatePivotDomainCommand {
        type: "UPDATE_OI_PIVOT_DOMAIN";
        pivotId: string;
        domain: Array;
    }

    export interface AddGlobalFilterCommand {
        type: "ADD_GLOBAL_FILTER";
        filter: CmdGlobalFilter;
        [string]: any; // Fields matching
    }

    export interface EditGlobalFilterCommand {
        type: "EDIT_GLOBAL_FILTER";
        filter: CmdGlobalFilter;
        [string]: any; // Fields matching
    }

    export interface RemoveGlobalFilterCommand {
        type: "REMOVE_GLOBAL_FILTER";
        id: string;
    }

    export interface MoveGlobalFilterCommand {
        type: "MOVE_GLOBAL_FILTER";
        id: string;
        delta: number;
    }

    // UI

    export interface RefreshAllDataSourcesCommand {
        type: "REFRESH_ALL_DATA_SOURCES";
    }

    export interface SetGlobalFilterValueCommand {
        type: "SET_GLOBAL_FILTER_VALUE";
        id: string;
        value: any;
        displayNames?: string[];
    }

    export interface SetManyGlobalFilterValueCommand {
        type: "SET_MANY_GLOBAL_FILTER_VALUE";
        filters: { filterId: string; value: any }[];
    }

    export interface ClearGlobalFilterValueCommand {
        type: "CLEAR_GLOBAL_FILTER_VALUE";
        id: string;
    }

    type OiCoreCommand =
        | ExtendedAddPivotCommand
        | ExtendedUpdatePivotCommand
        | UpdatePivotDomainCommand
        | AddThreadCommand
        | DeleteThreadCommand
        | EditThreadCommand
        | AddGlobalFilterCommand
        | EditGlobalFilterCommand
        | RemoveGlobalFilterCommand
        | MoveGlobalFilterCommand;

    export type AllCoreCommand = OiCoreCommand | CoreCommand;

    type OiLocalCommand =
        | RefreshAllDataSourcesCommand
        | SetGlobalFilterValueCommand
        | SetManyGlobalFilterValueCommand
        | ClearGlobalFilterValueCommand;

    type OiCommand = OiCoreCommand | OiLocalCommand;

    export type AllCommand = OiCommand | Command;
}

/** @oi-module */

import { Component } from "@oi/owl";

export class ChatterMessageCounter extends Component {
    static template = "project.ChatterMessageCounter";
    static props = {
        count: Number,
    };
}

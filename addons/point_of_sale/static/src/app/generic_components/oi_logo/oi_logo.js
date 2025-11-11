import { Component } from "@oi/owl";

export class OiLogo extends Component {
    static template = "point_of_sale.OiLogo";
    static props = {
        class: { type: String, optional: true },
        style: { type: String, optional: true },
        monochrome: { type: Boolean, optional: true },
    };
    static defaultProps = {
        class: "",
        style: "",
        monochrome: false,
    };
}

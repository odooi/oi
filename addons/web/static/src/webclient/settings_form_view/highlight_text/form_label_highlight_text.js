import { FormLabel } from "@web/views/form/form_label";
import { HighlightText } from "./highlight_text";
import { upgradeBooleanField } from "../fields/upgrade_boolean_field";

export class FormLabelHighlightText extends FormLabel {
    static template = "web.FormLabelHighlightText";
    static components = { HighlightText };
    setup() {
        super.setup();
        const isPlus = oi.info && oi.info.isPlus;
        if (this.props.fieldInfo?.field === upgradeBooleanField && !isPlus) {
            this.upgradePlus = true;
        }
    }
}

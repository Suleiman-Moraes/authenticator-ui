import { FormControl } from "@angular/forms";

export class FormValidations {
    static withoutSpace(control: FormControl) {
        const value = control.value;
        if (value && (value + '').trim().length > 0) {
            return null;
        }
        return { withoutSpace: true };
    }
}

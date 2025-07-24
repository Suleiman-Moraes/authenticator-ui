import { Validators } from "@angular/forms";
import { FormValidations } from "../validator/form-validations";

export class KeyDescriptionDTO {

    constructor(
        public key?: string,
        public description?: string
    ) { }

    public static createFormGroup(formBuilder: any) {
        return formBuilder.group({
            key: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(1), Validators.maxLength(18)]],
            description: [null]
        })
    }
}

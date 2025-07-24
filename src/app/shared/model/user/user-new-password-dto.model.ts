import { Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";

export class UserNewPasswordDTO {
    constructor(
        public oldPassword?: string,
        public newPassword?: string
    ) { }

    public static createFormGroup(formBuilder: any) {
        return formBuilder.group({
            oldPassword: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(6), Validators.maxLength(30)]],
            newPassword: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(6), Validators.maxLength(30)]]
        });
    }
}

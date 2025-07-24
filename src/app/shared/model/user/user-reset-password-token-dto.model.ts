import { Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";

export class UserResetPasswordTokenDTO {
    constructor(
        public password?: string,
        public token?: string
    ) { }

    public static createFormGroup(formBuilder: any) {
        return formBuilder.group({
            password: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(6), Validators.maxLength(30)]],
            token: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(36), Validators.maxLength(36)]]
        });
    }
}

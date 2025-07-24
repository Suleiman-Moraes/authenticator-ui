import { Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";

export class UserResetPasswordDTO {
    constructor(
        public username?: string,
        public email?: string
    ) { }

    public static createFormGroup(formBuilder: any) {
        return formBuilder.group({
            username: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            email: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150), Validators.email]]
        });
    }
}

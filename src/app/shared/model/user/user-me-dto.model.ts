import { Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";

export class UserMeDTO {
    constructor(
        public username?: string,
        public password?: string
    ) { }

    public static createFormGroup(formBuilder: any) {
        return formBuilder.group({
            username: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            password: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(6), Validators.maxLength(30)]]
        })
    }
}

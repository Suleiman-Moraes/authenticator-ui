import { FormBuilder, Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";
import { UserMeDTO } from "../user/user-me-dto.model";

export class PersonMeDTO {

    constructor(
        public name?: string,
        public email?: string,
        public address?: string,
        public user?: UserMeDTO
    ) {

    }

    public static createFormGroup(formBuilder: FormBuilder) {
        return formBuilder.group({
            name: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            email: [null, [Validators.required, FormValidations.withoutSpace, Validators.email, Validators.minLength(5), Validators.maxLength(150)]],
            address: [null, [Validators.maxLength(255)]],
            user: UserMeDTO.createFormGroup(formBuilder)
        })
    }
}

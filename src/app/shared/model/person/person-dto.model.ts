import { FormBuilder, Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";
import { UserDTO } from "../user/user-dto.model";

export class PersonDTO {

    constructor(
        public name?: string,
        public email?: string,
        public address?: string,
        public user?: UserDTO
    ) {

    }

    public static createFormGroup(formBuilder: FormBuilder) {
        return formBuilder.group({
            name: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            email: [null, [Validators.required, FormValidations.withoutSpace, Validators.email, Validators.minLength(5), Validators.maxLength(150)]],
            address: [null, [Validators.maxLength(255)]],
            user: UserDTO.createFormGroup(formBuilder)
        })
    }

    public static createFormGroupForNew(formBuilder: FormBuilder) {
        return formBuilder.group({
            name: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            email: [null, [Validators.required, FormValidations.withoutSpace, Validators.email, Validators.minLength(5), Validators.maxLength(150)]],
            address: [null, [Validators.maxLength(255)]],
            user: UserDTO.createFormGroupForNew(formBuilder)
        })
    }
}

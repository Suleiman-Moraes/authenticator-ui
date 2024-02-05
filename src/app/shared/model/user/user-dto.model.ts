import { Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";
import { KeyDescriptionDTO } from "../key-description-dto.model";

export class UserDTO {
    constructor(
        public username?: string,
        public password?: string,
        public profile?: KeyDescriptionDTO
    ) { }

    public static createFormGroup(formBuilder: any) {
        return formBuilder.group({
            username: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            password: [null, [Validators.minLength(6), Validators.maxLength(30)]],
            profile: KeyDescriptionDTO.createFormGroup(formBuilder)
        })
    }

    public static createFormGroupForNew(formBuilder: any) {
        return formBuilder.group({
            username: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(2), Validators.maxLength(150)]],
            password: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(6), Validators.maxLength(30)]],
            profile: KeyDescriptionDTO.createFormGroup(formBuilder)
        })
    }
}

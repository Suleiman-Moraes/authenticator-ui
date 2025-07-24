import { FormBuilder, Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";

export class EnterpriseDTO {

    constructor(
        public name?: string,
        public unit?: string,
        public constructionName?: string,
        public value?: number,
        public valueM2?: number,
        public vpl?: number,
        public sizeM2?: number
    ) {

    }

    public static createFormGroup(formBuilder: FormBuilder) {
        return formBuilder.group({
            name: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(0), Validators.maxLength(100)]],
            unit: [null, [Validators.maxLength(100)]],
            constructionName: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(0), Validators.maxLength(100)]],
            value: [null, [Validators.required, FormValidations.positive]],
            valueM2: [null, [Validators.required, FormValidations.positive]],
            vpl: [null, [Validators.required, FormValidations.positiveOrZero]],
            sizeM2: [null, [Validators.required, FormValidations.positive]]
        })
    }
}

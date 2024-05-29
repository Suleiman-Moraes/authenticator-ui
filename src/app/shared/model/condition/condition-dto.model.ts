import { FormBuilder, Validators } from "@angular/forms";
import { FrequencyEnum } from "../../enums/frequency-enum";
import { FormValidations } from "../../validator/form-validations";

export class ConditionDTO {

    constructor(
        public frequency?: FrequencyEnum,
        public numberInstallments?: number,
        public valueInstallments?: number,
        public beginningInstallment?: Date
    ) {

    }

    public static createFormGroup(formBuilder: FormBuilder) {
        return formBuilder.group({
            frequency: [null, [Validators.required, FormValidations.withoutSpace, Validators.minLength(0), FormValidations.enumValidator(FrequencyEnum)]],
            numberInstallments: [null, [Validators.required, FormValidations.positive]],
            valueInstallments: [null, [Validators.required, FormValidations.positive]],
            beginningInstallment: [null, [Validators.required, FormValidations.futureOrPresent]]
        })
    }
}

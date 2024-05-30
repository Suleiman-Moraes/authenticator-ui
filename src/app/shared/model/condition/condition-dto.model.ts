import { FormBuilder, FormControl, Validators } from "@angular/forms";
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
            beginningInstallment: [null, [Validators.required, FormValidations.futureOrPresent, this.dayValidBetween5O10O15]]
        })
    }

    private static dayValidBetween5O10O15(control: FormControl) {
        const value = control.value;
        if (!value) {
            return null;
        }
        const inputDate = new Date(value);
        const day = inputDate.getDate();
        if (day === 5 || day === 10 || day === 15) {
            return null;
        }
        return { dayValidBetween5O10O15: true };
    }
}

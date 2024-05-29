import { FormBuilder, Validators } from "@angular/forms";
import { FormValidations } from "../../validator/form-validations";
import { ConditionDTO } from "../condition/condition-dto.model";
import { EnterpriseDTO } from "../enterprise/enterprise-dto.model";

export class ProposalDTO {

    constructor(
        public value?: number,
        public valueM2?: number,
        public vpl?: number,
        public sizeM2?: number,
        public enterprise?: EnterpriseDTO,
        public conditions?: ConditionDTO[]
    ) {

    }

    public static createFormGroup(formBuilder: FormBuilder) {
        return formBuilder.group({
            value: [null, [Validators.required, FormValidations.positive]],
            valueM2: [null, [Validators.required, FormValidations.positive]],
            vpl: [null, [Validators.required, FormValidations.positiveOrZero]],
            sizeM2: [null, [Validators.required, FormValidations.positive]],
            enterprise: EnterpriseDTO.createFormGroup(formBuilder),
            conditions: formBuilder.array([])
        })
    }
}

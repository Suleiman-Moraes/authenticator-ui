import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {

    static withoutSpace(control: FormControl) {
        const value = control.value;
        if (value && (value + '').trim().length > 0) {
            return null;
        }
        return { withoutSpace: true };
    }

    static positive(control: FormControl) {
        const value = control.value;
        const isNumber = !isNaN(value);
        const isPositive = isNumber && Number(value) > 0;

        if (value === null || value === undefined || (value + '').trim().length === 0) {
            // Consider empty values as valid, for required validation use required validator
            return null;
        }
        else if (isNumber && isPositive) {
            return null;
        }
        else {
            return { positive: true };
        }
    }

    static positiveOrZero(control: FormControl) {
        const value = control.value;
        const isNumber = !isNaN(value);
        const isPositive = isNumber && Number(value) >= 0;

        if (value === null || value === undefined || (value + '').trim().length === 0) {
            // Consider empty values as valid, for required validation use required validator
            return null;
        }
        else if (isNumber && isPositive) {
            return null;
        }
        else {
            return { positiveOrZero: true };
        }
    }

    static futureOrPresent(control: FormControl) {
        const value = control.value;
        if (!value) {
            return null;
        }
        const currentDate = new Date();
        const inputDate = new Date(value);
        if (inputDate >= currentDate) {
            return null;
        }
        return { futureOrPresent: true };
    }

    static enumValidator(enumType: any): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (value == null || enumType[value] !== undefined) {
                return null;
            }
            return { enumValidator: true };
        };
    }
}

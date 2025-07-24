import { Component, Input } from '@angular/core';
import { errorMessages } from './error-messages';

@Component({
    selector: 'app-form-field-error',
    standalone: true,
    imports: [],
    template: `<small class="ng-dirty ng-invalid">{{ errorMessage }}</small>`
})
export class FormFieldErrorComponent {

    @Input('form') form: any;

    constructor() { }

    ngOnInit(): void { }

    public get errorMessage(): string | null {
        if (this.mustShowErrorMessage()) {
            return this.getErrorMessage();
        }
        else {
            return null;
        }
    }

    private getErrorMessage(): any {
        if (this.form?.errors?.required) {
            return "Dado Obrigatório";
        }
        else if (this.form?.errors?.maxlength) {
            const requiredLenght = this.form?.errors?.maxlength.requiredLength;
            return `Deve ter no máximo ${requiredLenght} caracteres`;
        }
        else if (this.form?.errors?.email) {
            return "Formato de e-mail Inválido";
        }
        else if (this.form?.errors?.pattern) {
            return "Formato Inválido";
        }
        else if (this.form?.errors?.minlength) {
            const requiredLenght = this.form?.errors?.minlength.requiredLength;
            return `Deve ter no mínimo ${requiredLenght} caracteres`;
        }

        //Custom
        else if (this.form?.errors?.withoutSpace) {
            return "Dado Obrigatório";
        }
        else if (this.form?.errors?.positive) {
            return "Valor deve ser positivo";
        }
        else if (this.form?.errors?.positiveOrZero) {
            return "Valor deve ser positivo ou zero";
        }
        else if (this.form?.errors?.futureOrPresent) {
            return "Data deve ser futura ou atual";
        }
        else if (this.form?.errors?.enumValidator) {
            return "Valor inválido";
        }

        else {
            let message = 'Erro';
            Object.keys(errorMessages).forEach(key => {
                if (this.form?.errors?.[key]) {
                    message = errorMessages[key];
                }
            });
            return message;
        }
    }

    private mustShowErrorMessage(): boolean | undefined {
        return this.form?.invalid && this.form?.touched;
    }
}

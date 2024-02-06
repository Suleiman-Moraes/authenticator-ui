import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';

@Component({
    selector: 'app-input-template',
    standalone: true,
    imports: [
        FormFieldErrorComponent
    ],
    template: `
    <div class="field">
        <label [for]="forName" id="label-of-{{forName}}">
            <strong>{{ name }}</strong>
        </label>
        <ng-content></ng-content>
        @if (form) {
            <app-form-field-error [form]="form.get(forName)"></app-form-field-error>
        }
    </div>
    `
})
export class InputTemplateComponent {

    @Input('for-name') forName!: string;
    @Input('name') name!: string;
    @Input('form') form: FormGroup | null = null;
}

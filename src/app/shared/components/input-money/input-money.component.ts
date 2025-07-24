import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTemplateComponent } from '../input-template/input-template.component';

@Component({
    selector: 'app-input-money',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTemplateComponent,
        InputNumberModule
    ],
    templateUrl: './input-money.component.html'
})
export class InputMoneyComponent {

    @Input('for-name') forName!: string;
    @Input('name') name!: string;
    @Input('form') form!: FormGroup;
    @Input() currency: string = 'BRL';
    @Input() locale: string = 'pt-BR';
    @Input() min: number = 0;
    @Input() max: number = 9999999999999;
    @Input() maxlength: number = 18;

    @Output('blur') blur: EventEmitter<any> = new EventEmitter<any>();

    onBlur(event: any): void {
        this.form.get(this.forName)?.markAsDirty();
        this.blur.emit(event);
    }
}

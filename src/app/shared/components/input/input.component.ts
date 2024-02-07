import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTemplateComponent } from '../input-template/input-template.component';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTemplateComponent,
        InputTextModule,
        InputMaskModule
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent {

    @Input('for-name') forName!: string;
    @Input('name') name!: string;
    @Input('form') form!: FormGroup;
    @Input() mask: string | null = null;
    @Input() imask: any = null;
    @Input('auto-clear') autoClear: boolean = true;
    @Input() maxlength: number = null;

    @Output('blur') blur: EventEmitter<any> = new EventEmitter<any>();

    onBlur(event: any): void {
        this.blur.emit(event);
    }
}

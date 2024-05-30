import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputDateComponent } from 'src/app/shared/components/input-date/input-date.component';
import { InputLabelComponent } from 'src/app/shared/components/input-label/input-label.component';
import { InputMoneyComponent } from 'src/app/shared/components/input-money/input-money.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ConstructionSelectFormComponent } from '../../construction/construction-select-form/construction-select-form.component';

@Component({
    selector: 'app-enterprise-form-recycle',
    standalone: true,
    imports: [
        InputComponent,
        InputMoneyComponent,
        InputNumberComponent,
        InputDateComponent,
        InputLabelComponent,
        ConstructionSelectFormComponent,
        CommonModule
    ],
    templateUrl: './enterprise-form-recycle.component.html',
    styleUrl: './enterprise-form-recycle.component.scss'
})
export class EnterpriseFormRecycleComponent {

    @Input() form!: FormGroup;

    today = new Date();
}

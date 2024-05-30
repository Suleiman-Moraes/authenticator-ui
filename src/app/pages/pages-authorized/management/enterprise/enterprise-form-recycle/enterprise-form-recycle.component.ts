import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class EnterpriseFormRecycleComponent implements OnInit {

    @Input() form!: FormGroup;

    today = new Date();

    ngOnInit(): void {

    }

    onBlur(key: string) {
        switch (key) {
            case 'value':
                this.calculateValueM2();
                this.calculateSizeM2();
                break;
            case 'sizeM2':
                this.calculateValueM2();
                this.calculateValue();
                break;
            case 'valueM2':
                this.calculateValue();
                this.calculateSizeM2();
                break;

            default:
                break;
        }
    }

    private calculateValue(): void {
        const sizeM2 = this.form.get('sizeM2')?.value;
        const valueM2 = this.form.get('valueM2')?.value;

        if (sizeM2 && valueM2) {
            this.form.get('value')?.setValue(sizeM2 * valueM2);
        }
    }

    private calculateValueM2(): void {
        const value = this.form.get('value')?.value;
        const sizeM2 = this.form.get('sizeM2')?.value;

        if (value && sizeM2) {
            this.form.get('valueM2')?.setValue(value / sizeM2);
        }
    }

    private calculateSizeM2(): void {
        const value = this.form.get('value')?.value;
        const valueM2 = this.form.get('valueM2')?.value;

        if (value && valueM2) {
            this.form.get('sizeM2')?.setValue(value / valueM2);
        }
    }
}

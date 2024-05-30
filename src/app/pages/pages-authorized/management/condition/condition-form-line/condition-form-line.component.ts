import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputDateComponent } from 'src/app/shared/components/input-date/input-date.component';
import { InputLabelComponent } from 'src/app/shared/components/input-label/input-label.component';
import { InputMoneyComponent } from 'src/app/shared/components/input-money/input-money.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';
import { SelectListComponent } from 'src/app/shared/components/select-list/select-list.component';
import { KeyDescriptionDTO } from 'src/app/shared/model/key-description-dto.model';

@Component({
    selector: 'app-condition-form-line',
    standalone: true,
    imports: [
        InputNumberComponent,
        InputMoneyComponent,
        InputDateComponent,
        InputLabelComponent,
        SelectListComponent,
        CommonModule
    ],
    templateUrl: './condition-form-line.component.html',
    styleUrl: './condition-form-line.component.scss'
})
export class ConditionFormLineComponent implements OnInit {

    @Input() form!: FormGroup;
    @Input() periodicities: KeyDescriptionDTO[] = [];
    @Output() amountChanged = new EventEmitter<number>();

    today: Date = new Date();
    amount: number = 0;

    ngOnInit(): void {
        this.form.get('numberInstallments')?.valueChanges.subscribe(value => {
            this.onValueChange(value, this.form.value.valueInstallments);
        });

        this.form.get('valueInstallments')?.valueChanges.subscribe(value => {
            this.onValueChange(value, this.form.value.numberInstallments);
        });
    }

    private onValueChange(v1: number, v2: number): void {
        const amount = this.getValueOrZero(v1) * this.getValueOrZero(v2);
        this.amount = amount;
        this.amountChanged.emit(amount);
    }

    private getValueOrZero(value: number): number {
        if (value) {
            return value;
        }
        return 0;
    }
}

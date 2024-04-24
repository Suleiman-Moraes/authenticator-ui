import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { DescriptionListComponent } from 'src/app/shared/components/description-list/description-list.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { InputDateComponent } from 'src/app/shared/components/input-date/input-date.component';
import { InputMoneyComponent } from 'src/app/shared/components/input-money/input-money.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';

@Component({
    selector: 'app-prototype',
    standalone: true,
    imports: [
        FormHeadComponent,
        CardModule,
        ToastModule,
        FieldsetModule,
        AvatarModule,
        AvatarGroupModule,
        InputMoneyComponent,
        InputNumberComponent,
        InputDateComponent,
        TranslateModule,
        DescriptionListComponent
    ],
    templateUrl: './prototype.component.html',
    styleUrl: './prototype.component.scss'
})
export class PrototypeComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;
    items: any[] = [
        { label: 'Proposta', value: 'R$ 2.000.478,87' },
        { label: 'VPL', value: 'R$ 2.000.478,87' },
        { label: 'Valor do m²', value: 'R$ 2.000.478,87' },
        { label: 'Data da Proposta', value: '23/04/2024' }
    ];

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            value: [null],
            vpl: [null],
            valueMeters2: [null],
            sizeMeters2: [null],
            date: [null]
        });
    }
}

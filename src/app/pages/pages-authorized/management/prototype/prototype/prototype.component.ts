import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { DescriptionListComponent } from 'src/app/shared/components/description-list/description-list.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { InputDateComponent } from 'src/app/shared/components/input-date/input-date.component';
import { InputMoneyComponent } from 'src/app/shared/components/input-money/input-money.component';
import { InputNumberComponent } from 'src/app/shared/components/input-number/input-number.component';
import { SelectListComponent } from 'src/app/shared/components/select-list/select-list.component';

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
        SelectListComponent,
        TranslateModule,
        DescriptionListComponent,
        PanelModule,
        ButtonModule
    ],
    providers: [
        DatePipe
    ],
    templateUrl: './prototype.component.html',
    styleUrl: './prototype.component.scss'
})
export class PrototypeComponent extends BaseResourceUtilComponent implements OnInit {

    private datePipe: DatePipe = inject(DatePipe);

    form!: FormGroup;
    items: any[] = [];
    itemsDifference: any[] = [];
    periodicities: any[] = [
        { key: 'SIGNAL', description: 'Sinal' },
        { key: 'ONLY', description: 'Única' },
        { key: 'MONTHLY', description: 'Mensal' },
        { key: 'SEMIANNUAL', description: 'Semestral' },
        { key: 'ANNUAL', description: 'Anual' },
        { key: 'FINANCING', description: 'Financiamento' }
    ]

    constructor() {
        super();
    }

    get susu(){
        return window.innerWidth;
    }

    ngOnInit(): void {
        this.initForm();
        this.items = [
            { label: 'Proposta', value: 'R$ 2.000.478,87' },
            { label: 'VPL', value: 'R$ 2.000.478,87' },
            { label: 'Valor do m²', value: 'R$ 2.000.478,87' },
            { label: 'Data da Proposta', value: this.datePipe.transform(new Date(), 'dd/MM/yyyy') }
        ];
        this.itemsDifference = [
            { label: 'Valor', value: 'R$ 2.000.478,87' },
            { label: 'Valor %', value: '12,52 %' },
            { label: 'VPL', value: 'R$ 2.000.478,87' },
            { label: 'VPL %', value: '- 12,5 %' },
            { label: 'Captação % (???)', value: '0 %' }
        ];
    }

    private initForm(): void {
        this.form = this.formBuilder.group({
            test: [null],
            value: [null],
            vpl: [null],
            valueMeters2: [null],
            sizeMeters2: [null],
            date: [null]
        });
    }
}

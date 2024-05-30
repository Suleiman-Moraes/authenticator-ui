import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { AfterContentChecked, Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { ToastModule } from 'primeng/toast';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { DescriptionListComponent } from 'src/app/shared/components/description-list/description-list.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { EnterpriseDTO } from 'src/app/shared/model/enterprise/enterprise-dto.model';
import { ProposalDTO } from 'src/app/shared/model/proposal/proposal-dto.model';
import { ProposalService } from 'src/app/shared/service/proposal.service';
import { ConditionFormArrayComponent } from '../../condition/condition-form-array/condition-form-array.component';
import { EnterpriseFormRecycleComponent } from '../../enterprise/enterprise-form-recycle/enterprise-form-recycle.component';

@Component({
    selector: 'app-prototype',
    standalone: true,
    imports: [
        FormHeadComponent,
        CardModule,
        ToastModule,
        FieldsetModule,
        DescriptionListComponent,
        CommonModule,
        EnterpriseFormRecycleComponent,
        ConditionFormArrayComponent,
        ButtonModule
    ],
    providers: [
        DatePipe,
        CurrencyPipe,
        DecimalPipe
    ],
    templateUrl: './prototype.component.html',
    styleUrl: './prototype.component.scss'
})
export class PrototypeComponent extends BaseResourceFormComponent implements OnInit, AfterContentChecked {

    private datePipe: DatePipe = inject(DatePipe);
    private currencyPipe: CurrencyPipe = inject(CurrencyPipe);
    private decimalPipe: DecimalPipe = inject(DecimalPipe);

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

    constructor(
        protected service: ProposalService
    ) {
        super(service);
    }

    get susu() {
        return window.innerWidth;
    }

    ngOnInit(): void {
        this.complement = 'proposal';
        this.onInit();
        this.applyItems();
        this.applyItemsDifference();
    }

    ngAfterContentChecked(): void {
        this.afterContentChecked();
    }

    onAmountChanged(amount: number) {
        this.form.get('value')?.setValue(amount || 0);
        this.form.get('vpl')?.setValue(this.form.value.value);
        this.calculateValueM2();

        this.applyItems();
        this.applyItemsDifference();
    }

    private applyItems(): void {
        const proposal: ProposalDTO = this.form.value;
        this.items = [
            { label: 'Proposta', value: this.currencyPipe.transform(proposal.value || 0, 'BRL') },
            { label: 'VPL', value: this.currencyPipe.transform(proposal.vpl || 0, 'BRL') },
            { label: 'Valor do m²', value: this.currencyPipe.transform(proposal.valueM2 || 0, 'BRL') },
            { label: 'Data da Proposta', value: this.datePipe.transform(new Date(), 'dd/MM/yyyy') }
        ];
    }

    private applyItemsDifference(enterprise: EnterpriseDTO = this.form.value.enterprise): void {
        const proposal: ProposalDTO = this.form.value;
        this.itemsDifference = [
            { label: 'Valor', value: this.currencyPipe.transform(proposal.value || 0, 'BRL') },
            { label: 'Valor %', value: this.calculateAndFormatPercent(proposal.value || 0, enterprise.value || 0) },
            { label: 'VPL', value: this.currencyPipe.transform(proposal.vpl || 0, 'BRL') },
            { label: 'VPL %', value: this.calculateAndFormatPercent(proposal.vpl || 0, enterprise.vpl || 0) }
        ];
    }

    private calculateAndFormatPercent(valueA: number, valueB: number): string {
        return this.decimalPipe.transform((valueA / valueB * 100.0) || 0, '1.2-2') + ' %';
    }

    protected initForm(): void {
        this.form = ProposalDTO.createFormGroup(this.formBuilder);

        this.form.get('enterprise')?.valueChanges.subscribe(value => {
            this.onChangeEnterprise(value);
        });
    }

    protected override createPageTitle(): string {
        return 'Nova Proposta';
    }

    protected override editionPageTitle(): string {
        return 'Alterar Proposta';
    }

    protected override afterSubmitFormSuccess(): void {
        this.openConfirmDialogAfterSave();
    }

    private onChangeEnterprise(value: EnterpriseDTO): void {
        this.form.get('sizeM2')?.setValue(value.sizeM2);
        this.calculateValueM2();

        this.applyItemsDifference(value);
    }

    private calculateValueM2(): void {
        const value = this.form.get('value')?.value;
        const sizeM2 = this.form.get('sizeM2')?.value;

        if (value && sizeM2) {
            this.form.get('valueM2')?.setValue(value / sizeM2);
        }
        else {
            this.form.get('valueM2')?.setValue(0);
        }
    }

    // TODO - remover
    protected override setCurrentAction(): void {
        this.currentAction = 'new';
    }
}

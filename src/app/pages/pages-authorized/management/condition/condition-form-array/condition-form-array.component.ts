import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, inject } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { ConditionDTO } from 'src/app/shared/model/condition/condition-dto.model';
import { KeyDescriptionDTO } from 'src/app/shared/model/key-description-dto.model';
import { AuxiliaryListService } from 'src/app/shared/service/auxiliary-list.service';
import { ConditionFormLineComponent } from '../condition-form-line/condition-form-line.component';

@Component({
    selector: 'app-condition-form-array',
    standalone: true,
    imports: [
        ConditionFormLineComponent,
        PanelModule,
        FieldsetModule,
        ButtonModule,
        ConfirmPopupModule,
        CommonModule
    ],
    templateUrl: './condition-form-array.component.html',
    styleUrl: './condition-form-array.component.scss'
})
export class ConditionFormArrayComponent extends BaseResourceUtilComponent implements OnInit {

    @Input() conditions!: FormArray;

    @Output() amountChanged: EventEmitter<number> = new EventEmitter<number>();

    @ViewChildren(ConditionFormLineComponent) conditionComponents!: QueryList<ConditionFormLineComponent>;

    periodicities: KeyDescriptionDTO[] = [];
    isPanelCollapsed: boolean[] = [];
    amount: number = 0;

    private auxiliaryListService: AuxiliaryListService = inject(AuxiliaryListService);

    ngOnInit(): void {
        this.doSomethingSimple(this.auxiliaryListService.getEnumList('FrequencyEnum'), (res: KeyDescriptionDTO[]) => this.periodicities = res);

        // TODO - remover
        this.addCondition();
    }

    get allPanelsCollapsed(): boolean {
        return this.isPanelCollapsed.every(x => x);
    }

    get containsConditions(): boolean {
        return this.conditions.controls.length > 0;
    }

    addCondition(): void {
        this.conditions.push(ConditionDTO.createFormGroup(this.formBuilder));
        this.isPanelCollapsed.push(false);
    }

    onChildAmountChanged(_?: number): void {
        setTimeout(() => {
            this.amount = this.conditionComponents.toArray().reduce((sum, component) => sum + component.amount, 0);
            this.amountChanged.emit(this.amount);
        }, 500);
    }

    removeCondition(index: number): void {
        this.conditions.removeAt(index);
        this.onChildAmountChanged();
        this.isPanelCollapsed.splice(index, 1);
    }

    getConditionName(index: number, condition: ConditionDTO): string {
        if (condition.frequency && this.periodicities?.length > 0) {
            return `Condição - ${this.periodicities.find(x => x.key === condition.frequency)?.description}`;
        }
        else {
            return `Condição - ${index + 1}`;
        }
    }

    callConfirmPopupRemoveAllCondition(event: Event): void {
        this.callConfirmPopup(event, () => this.removeAllCondition(), 'Confirma remover todas condições?');
    }

    collapseAllPanels(value: boolean = true): void {
        this.isPanelCollapsed = this.isPanelCollapsed.map(() => value);
    }

    private removeAllCondition(): void {
        this.conditions.clear();
        this.isPanelCollapsed = [];
        this.onChildAmountChanged();
    }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToolbarModule } from 'primeng/toolbar';
import { BaseResourceUtilComponent } from '../base-resource-util/base-resource-util.component';

@Component({
    selector: 'app-form-head',
    standalone: true,
    imports: [
        ButtonModule,
        ToolbarModule,
        RouterModule,
        ConfirmPopupModule
    ],
    templateUrl: './form-head.component.html',
    styleUrl: './form-head.component.scss'
})
export class FormHeadComponent extends BaseResourceUtilComponent {

    @Input() title: string = 'Novo';
    @Input() complement: string = '';

    @Output('save') callEventSave: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected override afterCallConfirmSaveSuccess(): void {
        this.callEventSave.emit(true);
    }
}

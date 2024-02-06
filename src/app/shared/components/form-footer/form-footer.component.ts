import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToolbarModule } from 'primeng/toolbar';
import { BaseResourceUtilComponent } from '../base-resource-util/base-resource-util.component';

@Component({
    selector: 'app-form-footer',
    standalone: true,
    imports: [
        ButtonModule,
        ToolbarModule,
        RouterModule,
        ConfirmPopupModule
    ],
    templateUrl: './form-footer.component.html',
    styleUrl: './form-footer.component.scss'
})
export class FormFooterComponent extends BaseResourceUtilComponent {

    @Input() complement: string = '';

    @Output('save') callEventSave: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected override afterCallConfirmSaveSuccess(): void {
        this.callEventSave.emit(true);
    }
}

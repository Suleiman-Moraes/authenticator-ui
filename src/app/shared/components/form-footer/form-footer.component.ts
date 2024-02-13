import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { BaseResourceUtilComponent } from '../base-resource-util/base-resource-util.component';

@Component({
    selector: 'app-form-footer',
    standalone: true,
    imports: [
        ButtonModule,
        ConfirmPopupModule
    ],
    templateUrl: './form-footer.component.html',
    styleUrl: './form-footer.component.scss'
})
export class FormFooterComponent extends BaseResourceUtilComponent {

    @Output('save') callEventSave: EventEmitter<boolean> = new EventEmitter<boolean>();

    protected override afterCallConfirmSaveSuccess(): void {
        this.callEventSave.emit(true);
    }
}

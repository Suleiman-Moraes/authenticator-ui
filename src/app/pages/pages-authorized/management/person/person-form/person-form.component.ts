import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { PersonDTO } from 'src/app/shared/model/person/person-dto.model';
import { PersonService } from 'src/app/shared/service/person.service';
import { UserFormRecycleComponent } from '../../user/user-form-recycle/user-form-recycle.component';

@Component({
    selector: 'app-person-form',
    standalone: true,
    imports: [
        CardModule,
        ToastModule,
        FormHeadComponent,
        FormFooterComponent,
        InputComponent,
        UserFormRecycleComponent,
        ConfirmDialogModule
    ],
    templateUrl: './person-form.component.html',
    styleUrl: './person-form.component.scss'
})
export class PersonFormComponent extends BaseResourceFormComponent implements OnInit, AfterContentChecked {

    constructor(
        protected service: PersonService
    ) {
        super(service);
    }

    ngOnInit(): void {
        this.complement = 'person';
        this.onInit();
    }

    ngAfterContentChecked(): void {
        this.afterContentChecked();
    }

    protected initForm(): void {
        this.form = this.isNew ? PersonDTO.createFormGroupForNew(this.formBuilder) : PersonDTO.createFormGroup(this.formBuilder);
    }

    protected override createPageTitle(): string {
        return 'Inserir Pessoa';
    }

    protected override editionPageTitle(): string {
        return 'Alterar Pessoa';
    }

    protected override afterSubmitFormSuccess(): void {
        this.openConfirmDialogAfterSave();
    }
}

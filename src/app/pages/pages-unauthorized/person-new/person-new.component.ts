import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { PersonDTO } from 'src/app/shared/model/person/person-dto.model';
import { PersonMeDTO } from 'src/app/shared/model/person/person-me-dto.model';
import { PersonMeService } from 'src/app/shared/service/person-me.service';
import { PersonFormRecycleComponent } from '../../pages-authorized/management/person/person-form-recycle/person-form-recycle.component';

@Component({
    selector: 'app-person-new',
    standalone: true,
    imports: [
        CardModule,
        ToastModule,
        PersonFormRecycleComponent,
        FormHeadComponent,
        FormFooterComponent,
        ConfirmDialogModule
    ],
    templateUrl: './person-new.component.html',
    styleUrl: './person-new.component.scss'
})
export class PersonNewComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;
    resource: PersonDTO;

    constructor(
        private service: PersonMeService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    submitForm(): void {
        this.blockUI.start();
        if (this.form.valid) {
            this.doSomething(this.service.insertMe(this.form.value), (_: number) => {
                this.blockUI.stop();
                this.openConfirmDialogAfterSave();
            });
        }
        else {
            this.showError('Preencha todos os campos obrigatórios');
            this.markAllAsTouchedAndAsDirty(this.form);
            this.blockUI.stop();
        }
    }

    openConfirmDialogAfterSave(): void {
        this.confirmationService.confirm({
            key: 'confirmAfterSave',
            message: `Registro inserido com sucesso!`,
            header: 'Confirmação',
            icon: 'pi pi-check-circle',
            acceptLabel: 'Novo',
            rejectLabel: 'Login',
            acceptIcon: 'pi pi-plus mr-2',
            rejectIcon: 'pi pi-sign-in mr-2',
            acceptButtonStyleClass: 'p-button',
            rejectButtonStyleClass: 'p-button',
            accept: () => this.initForm(),
            reject: () => this.router.navigate(['/login'])
        });
    }

    private initForm(): void {
        this.form = PersonMeDTO.createFormGroup(this.formBuilder);
    }
}

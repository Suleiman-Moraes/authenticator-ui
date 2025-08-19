import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { PersonFormRecycleComponent } from 'src/app/pages/management/person/person-form-recycle/person-form-recycle.component';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { PersonDTO } from 'src/app/shared/model/person/person-dto.model';
import { PersonMeService } from 'src/app/shared/service/person-me.service';

@Component({
    selector: 'app-person-me',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ToastModule,
        PersonFormRecycleComponent,
        FormHeadComponent,
        FormFooterComponent,
        RippleModule
    ],
    templateUrl: './person-me.component.html',
    styleUrl: './person-me.component.scss',
    providers: [ConfirmationService]
})
export class PersonMeComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;
    resource!: PersonDTO;

    constructor(
        protected service: PersonMeService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadResource();
    }

    submitForm(): void {
        this.blockUI.start();
        if (this.form.valid) {
            this.doSomething(this.service.updateMe(this.form.value), (_: number) => {
                this.showSuccess('Perfil atualizado com sucesso!');
                this.blockUI.stop();
            });
        }
        else {
            this.showError('Preencha todos os campos obrigatórios');
            this.markAllAsTouchedAndAsDirty(this.form);
            this.blockUI.stop();
        }
    }

    private initForm(): void {
        this.form = PersonDTO.createFormGroup(this.formBuilder);
    }

    private loadResource(): void {
        this.blockUI.start();
        this.doSomething(this.service.getMe(), (res: PersonDTO) => {
            this.resource = res;
            this.form.patchValue(this.resource);
        });
    }
}

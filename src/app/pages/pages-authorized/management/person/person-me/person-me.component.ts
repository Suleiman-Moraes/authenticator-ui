import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { PersonDTO } from 'src/app/shared/model/person/person-dto.model';
import { PersonMeService } from 'src/app/shared/service/person-me.service';
import { PersonFormRecycleComponent } from '../person-form-recycle/person-form-recycle.component';

@Component({
    selector: 'app-person-me',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ToastModule,
        PersonFormRecycleComponent,
        FormHeadComponent,
        FormFooterComponent
    ],
    templateUrl: './person-me.component.html',
    styleUrl: './person-me.component.scss'
})
export class PersonMeComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;
    resource: PersonDTO;

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
            this.blockUI.stop();
        }
    }

    private initForm(): void {
        this.form = PersonDTO.createFormGroup(this.formBuilder);
    }

    private loadResource(): void {
        this.doSomething(this.service.getMe(), (res: PersonDTO) => {
            this.resource = res;
            this.form.patchValue(this.resource);
        });
    }
}

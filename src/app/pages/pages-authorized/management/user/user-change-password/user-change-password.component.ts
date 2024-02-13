import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { InputTemplateComponent } from 'src/app/shared/components/input-template/input-template.component';
import { UserNewPasswordDTO } from 'src/app/shared/model/user/user-new-password-dto.model';
import { UserMeService } from 'src/app/shared/service/user-me.service';

@Component({
    selector: 'app-user-change-password',
    standalone: true,
    imports: [
        CardModule,
        ToastModule,
        FormHeadComponent,
        FormFooterComponent,
        PasswordModule,
        InputTemplateComponent,
        ReactiveFormsModule
    ],
    templateUrl: './user-change-password.component.html',
    styleUrl: './user-change-password.component.scss'
})
export class UserChangePasswordComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;
    resource!: UserNewPasswordDTO;

    constructor(
        protected service: UserMeService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    submitForm(): void {
        this.blockUI.start();
        if (this.form.valid) {
            this.doSomething(this.service.changePasswordMe(this.form.value), (_: any) => {
                this.showSuccess('Senha atualizada com sucesso!');
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
        this.form = UserNewPasswordDTO.createFormGroup(this.formBuilder);
    }
}

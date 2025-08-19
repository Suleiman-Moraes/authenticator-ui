import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFieldErrorComponent } from 'src/app/shared/components/form-field-error/form-field-error.component';
import { UserResetPasswordDTO } from 'src/app/shared/model/user/user-reset-password-dto.model';
import { UserMeService } from 'src/app/shared/service/user-me.service';
import { AuthDynamicContentComponent } from '../../management/login/auth-dynamic-content/auth-dynamic-content.component';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        FormFieldErrorComponent,
        RippleModule,
        AuthDynamicContentComponent,
        ToastModule
    ],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
    providers: [ConfirmationService]
})
export class ForgotPasswordComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;

    constructor(
        private userMeService: UserMeService
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = UserResetPasswordDTO.createFormGroup(this.formBuilder);
    }

    resetPassword(): void {
        this.loading = true;
        if (this.form.valid) {
            this.doSomething(this.userMeService.resetPassword(this.form.value), () => {
                this.loading = false;
                this.showSuccess('Um e-mail de redefinição de senha foi enviado!');
            });
        }
        else {
            this.markAllAsTouchedAndAsDirty(this.form);
            this.loading = false;
        }
    }

    onInputEnter(event: any) {
        if (event.key == 'Enter') {
            this.resetPassword();
        }
    }
}

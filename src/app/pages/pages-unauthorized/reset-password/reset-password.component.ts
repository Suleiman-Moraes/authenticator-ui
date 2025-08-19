import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFieldErrorComponent } from 'src/app/shared/components/form-field-error/form-field-error.component';
import { UserResetPasswordTokenDTO } from 'src/app/shared/model/user/user-reset-password-token-dto.model';
import { UserMeService } from 'src/app/shared/service/user-me.service';
import { AuthDynamicContentComponent } from '../../management/login/auth-dynamic-content/auth-dynamic-content.component';

@Component({
    selector: 'app-reset-password',
    imports: [
        CommonModule,
        ButtonModule,
        FormsModule,
        PasswordModule,
        RouterModule,
        ReactiveFormsModule,
        FormFieldErrorComponent,
        RippleModule,
        AuthDynamicContentComponent,
        ToastModule
    ],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss',
    providers: [ConfirmationService]
})
export class ResetPasswordComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;

    constructor(
        private userMeService: UserMeService,
        private route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = UserResetPasswordTokenDTO.createFormGroup(this.formBuilder);
        this.form.get('token')?.setValue(this.route.snapshot.params['token']);
    }

    resetPasswordToken(): void {
        this.loading = true;
        if (this.form.valid) {
            this.doSomething(this.userMeService.resetPasswordToken(this.form.value), () => {
                this.loading = false;
                this.showSuccess('Senha alterada com sucesso!');
                setTimeout(() => {
                    this.router.navigateByUrl('/login');
                }, 2500);
            });
        }
        else {
            this.markAllAsTouchedAndAsDirty(this.form);
            this.loading = false;
        }
    }

    onInputEnter(event: any) {
        if (event.key == 'Enter') {
            this.resetPasswordToken();
        }
    }
}

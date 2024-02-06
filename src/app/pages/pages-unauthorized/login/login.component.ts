import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { FormFieldErrorComponent } from 'src/app/shared/components/form-field-error/form-field-error.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        RouterModule,
        ToastModule,
        ReactiveFormsModule,
        FormFieldErrorComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    providers: [ConfirmationService, JwtHelperService, MessageService]
})
export class LoginComponent extends BaseResourceUtilComponent {

    password!: string;

    form: FormGroup;

    constructor(
        public layoutService: LayoutService,
        private route: ActivatedRoute
    ) {
        super();
    }

    ngOnInit(): void {
        this.authenticationService.logout();
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(150)]],
            password: ['', [Validators.required, Validators.maxLength(30)]],
        })
    }

    logInto(): void {
        this.blockUI.start();
        if (this.form.valid) {
            const metodo = this.authenticationService.login(this.form.value.username, this.form.value.password);
            metodo.then(() => {
                this.blockUI.stop();
                if (this.route.snapshot.queryParams['from']?.length > 0) {
                    this.router.navigateByUrl(this.route.snapshot.queryParams['from']);
                }
                else {
                    this.showSuccess(`Welcome ${this.authenticationService.jwtPayload.name}!`);
                    this.router.navigateByUrl('pages');
                }
            }).catch((err: any) => this.handleCatchError(err));
        }
        else {
            this.markAllAsTouchedAndAsDirty(this.form);
            this.blockUI.stop();
        }
    }
}

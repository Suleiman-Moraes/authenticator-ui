import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { PersonNewComponent } from './person-new/person-new.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: '', title: 'Login', component: LoginComponent },
    { path: 'new', title: 'Create new account', component: PersonNewComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'forgot', title: 'Forgot Password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', title: 'Reset Password', component: ResetPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesUnauthorizedRoutingModule { }

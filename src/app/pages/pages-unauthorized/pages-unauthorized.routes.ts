import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { PersonNewComponent } from "./person-new/person-new.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

export const pagesUnauthorizedRoutes: Routes = [
    { path: '', title: 'Login', component: LoginComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'forgot', title: 'Forgot Password', component: ForgotPasswordComponent },
    { path: 'new', title: 'Create new account', component: PersonNewComponent },
    { path: 'reset-password/:token', title: 'Reset Password', component: ResetPasswordComponent }
];

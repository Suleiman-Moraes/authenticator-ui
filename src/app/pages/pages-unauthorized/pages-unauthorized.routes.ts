import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";

export const pagesUnauthorizedRoutes: Routes = [
    { path: '', title: 'Login', component: LoginComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'forgot', title: 'Forgot Password', component: ForgotPasswordComponent }
];

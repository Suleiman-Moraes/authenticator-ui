import { Routes } from "@angular/router";
import { authGuard } from "src/app/shared/security/auth.guard";
import { HomeComponent } from "./home/home.component";
import { UserChangePasswordComponent } from "./user-change-password/user-change-password.component";

export const pagesAuthorizedRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard] },
    { path: 'change-password', title: 'Change Password', component: UserChangePasswordComponent },
     { path: 'person', loadChildren: () => import('./person/person.routes').then((m) => m.personRoutes) },

    // { path: '', component: HomeComponent, canActivate: [authGuard], data: { roles: [Role.ROLE_ROOT] } },
];

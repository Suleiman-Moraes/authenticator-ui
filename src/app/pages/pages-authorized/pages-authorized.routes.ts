import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UserChangePasswordComponent } from "./user-change-password/user-change-password.component";

export const pagesAuthorizedRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'change-password', title: 'Change Password', component: UserChangePasswordComponent },
    { path: 'person', loadChildren: () => import('./person/person.routes').then((m) => m.personRoutes) },
    { path: 'proposal', loadChildren: () => import('./proposal/proposal.routes').then((m) => m.proposalRoutes) },
    { path: 'prototype', loadChildren: () => import('./prototype/prototype.routes').then((m) => m.prototypeRoutes) }

    // { path: '', component: HomeComponent, canActivate: [authGuard], data: { roles: [Role.ROLE_ROOT] } },
];

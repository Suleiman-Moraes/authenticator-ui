import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { authGuard } from '../shared/security/auth.guard';
import { Role } from '../shared/security/role.enum';
import { HomeComponent } from './pages-authorized/home/home.component';

const routes: Routes = [
    {
        path: 'pages', component: AppLayoutComponent, canActivate: [authGuard],
        children: [
            { path: '', loadChildren: () => import('./pages-authorized/pages-authorized.module').then((m) => m.PagesAuthorizedModule)},
            { path: 'root' , component: HomeComponent, canActivate: [authGuard], data: {roles: [Role.ROLE_ROOT]}},
        ]
    },
    {
        path: '',
        loadChildren: () =>
            import('./pages-unauthorized/pages-unauthorized.module').then(
                (m) => m.PagesUnauthorizedModule
            ),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }

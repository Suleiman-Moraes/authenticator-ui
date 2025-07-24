import { Routes } from '@angular/router';
import { AppLayout } from '../layout/component/app.layout';
import { authGuard } from '../shared/security/auth.guard';
import { Role } from '../shared/security/role.enum';
import { HomeComponent } from './pages-authorized/home/home.component';

export const pagesRoutes: Routes = [
    {
        path: 'pages', component: AppLayout, canActivate: [authGuard],
        children: [
            { path: 'root', component: HomeComponent, canActivate: [authGuard], data: { roles: [Role.ROLE_ROOT] } }
        ]
    },
    { path: 'home', component: HomeComponent },
    { path: '', loadChildren: () => import('./pages-unauthorized/pages-unauthorized.routes').then((m) => m.pagesUnauthorizedRoutes) }
];

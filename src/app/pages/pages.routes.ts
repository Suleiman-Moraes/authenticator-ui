import { Routes } from '@angular/router';
import { AppLayout } from '../layout/component/app.layout';
import { authGuard } from '../shared/security/auth.guard';
import { HomeComponent } from './pages-authorized/home/home.component';

export const pagesRoutes: Routes = [
    {
        path: 'pages', component: AppLayout, canActivate: [authGuard],
        children: [
            { path: '', loadChildren: () => import('./pages-authorized/pages-authorized.routes').then((m) => m.pagesAuthorizedRoutes) }
        ]
    },
    { path: 'home', component: HomeComponent },
    { path: '', loadChildren: () => import('./pages-unauthorized/pages-unauthorized.routes').then((m) => m.pagesUnauthorizedRoutes) }
];

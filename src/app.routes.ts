import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';

export const appRoutes: Routes = [
    {
        path: 'pages',
        component: AppLayout,
        children: [
            { path: '', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: '', pathMatch: 'full', redirectTo: '/pages' },
    { path: '**', redirectTo: '/notfound' }
];

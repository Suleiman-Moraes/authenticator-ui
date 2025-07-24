import { Routes } from '@angular/router';
import { NotfoundComponent } from './app/pages/pages-unauthorized/notfound/notfound.component';

export const appRoutes: Routes = [
    { path: '', loadChildren: () => import('./app/pages/pages.routes').then((m) => m.pagesRoutes) },
    { path: '404', component: NotfoundComponent },
    { path: '**', redirectTo: '/404' }
];

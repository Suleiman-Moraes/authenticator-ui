import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent },
    { path: 'person', loadChildren: () => import('./management/person/person.module').then((m) => m.PersonModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesAuthorizedRoutingModule {}

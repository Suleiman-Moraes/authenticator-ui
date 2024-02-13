import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserChangePasswordComponent } from './management/user/user-change-password/user-change-password.component';

const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent },
    { path: 'change-password', title: 'Change Password', component: UserChangePasswordComponent },
    { path: 'person', loadChildren: () => import('./management/person/person.module').then((m) => m.PersonModule) }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesAuthorizedRoutingModule {}

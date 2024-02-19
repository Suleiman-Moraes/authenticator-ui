import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/security/auth.guard';
import { Role } from 'src/app/shared/security/role.enum';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonMeComponent } from './person-me/person-me.component';

const routes: Routes = [
    { path: '', component: PersonListComponent, title: 'Person List', canActivate: [authGuard], data: { roles: [Role.ROLE_ADMIN] } },
    { path: 'me', component: PersonMeComponent, title: 'My Person', canActivate: [authGuard] },
    { path: 'new', component: PersonFormComponent, title: 'New Person', canActivate: [authGuard], data: { roles: [Role.ROLE_ADMIN] } },
    { path: 'edit/:key', component: PersonFormComponent, title: 'Edit Person', canActivate: [authGuard], data: { roles: [Role.ROLE_ADMIN] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }

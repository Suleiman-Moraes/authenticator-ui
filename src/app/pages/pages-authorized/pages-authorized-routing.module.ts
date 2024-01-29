import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/security/auth.guard';
import { Role } from 'src/app/shared/security/role.enum';
import { HomeComponent } from './home/home.component';
import { PersonListComponent } from './management/person/person-list/person-list.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'person', component: PersonListComponent, canActivate: [authGuard], data: { roles: [Role.ROLE_ADMIN] } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesAuthorizedRoutingModule {}

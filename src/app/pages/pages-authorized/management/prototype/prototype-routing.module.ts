import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/security/auth.guard';
import { Role } from 'src/app/shared/security/role.enum';
import { PrototypeComponent } from './prototype/prototype.component';

const routes: Routes = [
    { path: '', component: PrototypeComponent, title: 'Prototype', canActivate: [authGuard], data: { roles: [Role.ROLE_ADMIN] } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrototypeRoutingModule { }

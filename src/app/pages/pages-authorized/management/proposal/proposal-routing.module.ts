import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from 'src/app/shared/security/auth.guard';
import { ProposalFormComponent } from './proposal-form/proposal-form.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';

const routes: Routes = [
    { path: '', component: ProposalListComponent, title: 'Proposal List', canActivate: [authGuard] },
    { path: 'new', component: ProposalFormComponent, title: 'New Proposal', canActivate: [authGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProposalRoutingModule { }

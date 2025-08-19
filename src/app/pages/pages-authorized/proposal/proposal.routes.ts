import { Routes } from "@angular/router";
import { ProposalFormComponent } from "./proposal-form/proposal-form.component";
import { ProposalListComponent } from "./proposal-list/proposal-list.component";

export const proposalRoutes: Routes = [
    { path: '', component: ProposalListComponent, title: 'Proposal List' },
    { path: 'new', component: ProposalFormComponent, title: 'New Proposal' }
];

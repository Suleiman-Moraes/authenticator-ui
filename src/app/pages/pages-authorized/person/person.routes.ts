import { Routes } from "@angular/router";
import { Role } from "src/app/shared/security/role.enum";
import { PersonFormComponent } from "./person-form/person-form.component";
import { PersonListComponent } from "./person-list/person-list.component";
import { PersonMeComponent } from "./person-me/person-me.component";

export const personRoutes: Routes = [
    { path: '', component: PersonListComponent, title: 'Person List', data: { roles: [Role.ROLE_ADMIN] } },
    { path: 'me', component: PersonMeComponent, title: 'My Person' },
    { path: 'new', component: PersonFormComponent, title: 'New Person', data: { roles: [Role.ROLE_ADMIN] } },
    { path: 'edit/:key', component: PersonFormComponent, title: 'Edit Person', data: { roles: [Role.ROLE_ADMIN] } }
];

import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ListTableBodyComponent } from 'src/app/shared/components/list-table-body/list-table-body.component';
import { ListTableHeadComponent } from 'src/app/shared/components/list-table-head/list-table-head.component';
import { PersonService } from 'src/app/shared/service/person.service';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        ListTableHeadComponent,
        ListTableBodyComponent,
        CardModule,
        ToastModule,
        RippleModule
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss',
    providers: [ConfirmationService]
})
export class PersonListComponent extends BaseResourceListComponent {

    map: any = {
        'name': 'Nome',
        'username': 'Login',
        'profileDescription': 'Perfil',
        'email': 'Email',
        'address': 'Endereço'
    };

    constructor(
        private personService: PersonService
    ) {
        super(personService, 'PersonListComponent');
    }
}

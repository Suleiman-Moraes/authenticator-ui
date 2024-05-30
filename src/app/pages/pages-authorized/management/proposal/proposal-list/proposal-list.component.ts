import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ListTableBodyComponent } from 'src/app/shared/components/list-table-body/list-table-body.component';
import { ListTableHeadComponent } from 'src/app/shared/components/list-table-head/list-table-head.component';
import { ProposalService } from 'src/app/shared/service/proposal.service';

@Component({
    selector: 'app-proposal-list',
    standalone: true,
    imports: [
        ListTableHeadComponent,
        ListTableBodyComponent,
        CardModule,
        ToastModule
    ],
    templateUrl: './proposal-list.component.html',
    styleUrl: './proposal-list.component.scss'
})
export class ProposalListComponent extends BaseResourceListComponent {

    map: any = {
        'name': 'Nome',
        'username': 'Login',
        'profileDescription': 'Perfil',
        'email': 'Email',
        'address': 'Endereço'
    };

    constructor(
        private service: ProposalService
    ) {
        super(service, 'ProposalListComponent');
    }
}

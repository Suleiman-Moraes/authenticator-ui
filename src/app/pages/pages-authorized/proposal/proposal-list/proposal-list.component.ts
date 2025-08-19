import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
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
        ToastModule,
        RippleModule
    ],
    templateUrl: './proposal-list.component.html',
    styleUrl: './proposal-list.component.scss',
    providers: [ConfirmationService]
})
export class ProposalListComponent extends BaseResourceListComponent {

    map: any = {
        'enterpriseName': 'Nome Empreendimento',
        'enterpriseUnit': 'Unidade',
        'sizeM2': 'Tamanho m²',
        'value': 'Valor',
        'date': 'Data'
    };

    colPipes: any = {
        value: 'currency',
        date: 'date',
        sizeM2: 'number'
    };

    constructor(
        private service: ProposalService
    ) {
        super(service, 'ProposalListComponent');
    }
}

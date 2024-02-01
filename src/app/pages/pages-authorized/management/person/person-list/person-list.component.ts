import { Component, Injector } from '@angular/core';
import { CardModule } from 'primeng/card';
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
        CardModule
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent extends BaseResourceListComponent{

    map: any = {
        'code': 'Code',
        'name': 'Name',
        'category': 'Category',
        'quantity': 'Quantity',
        'price': 'Price'
    };
    colPipes: any = {
        'price': 'currency'
    };

    constructor(
        injector: Injector,
        private personService: PersonService
    ) {
        super(injector, personService);
    }
}

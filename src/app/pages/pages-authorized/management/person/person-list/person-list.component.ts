import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { ListTableHeadComponent } from 'src/app/shared/components/list-table-head/list-table-head.component';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        ListTableHeadComponent,
        CommonModule,
        CardModule,
        RouterModule,
        TableModule,
        PaginatorModule,
        ButtonModule
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

    list: any[] = [];
    rows = 30;
    totalRecords = 150;
    loading = true;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.list = data;
            this.loading = false;
        });
    }

    customSort(event: SortEvent) {
        console.log(event);

        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }

    pageChange(event: PaginatorState) {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 3000);
        console.log(event);
        this.rows = event.rows;
    }

    serach(event: string) {
        alert(event);
    }
}

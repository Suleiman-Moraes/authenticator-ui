import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    selector: 'app-person-list',
    standalone: true,
    imports: [
        CommonModule,
        ToolbarModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        RouterModule,
        InputGroupModule,
        InputGroupAddonModule,
        TableModule
    ],
    templateUrl: './person-list.component.html',
    styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

    list: any[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.list = data;
        });
    }

    customSort(event: SortEvent) {
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

    onInputSearch(event: any) {
        if (event.key == 'Enter') {
            alert("teste");
        }
    }
}

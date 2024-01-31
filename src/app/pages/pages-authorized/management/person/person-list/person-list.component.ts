import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProductService } from 'src/app/demo/service/product.service';
import { ListTableBodyComponent } from 'src/app/shared/components/list-table-body/list-table-body.component';
import { ListTableHeadComponent } from 'src/app/shared/components/list-table-head/list-table-head.component';
import { Filter } from 'src/app/shared/model/default/filter';
import { Page } from 'src/app/shared/model/default/page';

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
export class PersonListComponent {

    list: any[] = [];
    list0: any[] = [];
    list1: any[] = [];
    list2: any[] = [];
    page: Page<any> = {};
    rows = 30;
    totalRecords = 150;
    loading = true;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.list = data;
            this.list0 = data.splice(0, 10);
            this.list1 = data.splice(0, 10);
            this.list2 = data;
            this.page = {
                content: this.list0,
                totalElements: 30,
                size: 10,
                pageable: {
                    offset: 0,
                }
            };
            this.loading = false;
        });
    }

    pageChange(event: Filter) {
        this.loading = true;
        console.log(event);
        switch (event.page) {
            case 0:
                this.page.content = this.list0;
                break;
            case 1:
                this.page.content = this.list1;
                break;
            default:
                this.page.content = this.list2;
                break;
        }
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }

    serach(event: string) {
        alert(event);
    }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Filter } from '../../model/default/filter';
import { Page } from '../../model/default/page';
import { Direction } from '../../model/enum/direction';

@Component({
    selector: 'app-list-table-body',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        ButtonModule,
        RouterModule
    ],
    templateUrl: './list-table-body.component.html',
    styleUrl: './list-table-body.component.scss'
})
export class ListTableBodyComponent {

    @Input() set page(page: Page<any>) {
        this._page = page;
        this.loading = false;
    }
    @Input() loading: boolean;
    @Output('table-change') tableChangeEvent: EventEmitter<Filter> = new EventEmitter<Filter>();

    filter: Filter = {};

    private _page: Page<any> = {
        empty: true
    };

    get page(): Page<any> {
        return this._page;
    }

    customSort(event: SortEvent) {
        this.filter.property = event.field;
        this.filter.direction = event.order > 0 ? Direction.ASC : Direction.DESC;
        this.tableChangeEvent.emit(this.filter);

        /**
         * event.data.sort((data1, data2) => {
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
         */
    }

    pageChange(event: PaginatorState) {
        this.filter.size = event.rows;
        this.filter.page = event.page;
        this.tableChangeEvent.emit(this.filter);
    }
}

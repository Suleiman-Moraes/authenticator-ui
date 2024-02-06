import { inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Filter } from "../../model/default/filter";
import { Page } from "../../model/default/page";
import { BaseResourceService } from "../base-resource-service/base-resource-service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

export abstract class BaseResourceListComponent extends BaseResourceUtilComponent {

    isAddParamUrl: boolean = true;
    page: Page<any> = {
        empty: true
    }

    protected filter: Filter = {
        paginate: true,
        size: 5,
        page: 0
    }
    protected titleService: Title = inject(Title);
    protected route: ActivatedRoute = inject(ActivatedRoute);

    constructor(
        private resourceService: BaseResourceService,
        private componentName: string
    ) {
        super();

        this.findAllFirst();
    }

    pageChange(event: Filter) {
        if (event.page || 0 == event.page) {
            this.filter.page = event.page;
        }
        if (event.size) {
            this.filter.size = event.size;
        }
        if (event.direction) {
            this.filter.direction = event.direction;
        }
        if (event.property) {
            this.filter.property = event.property;
        }
        this.findAll(this.filter);
    }

    serach(event: string) {
        event = event ? event.trim() : null;
        this.filter.searchText = event;
        this.findAll(this.filter);
    }

    protected findAll(filter: Filter) {
        this.loading = true;
        this.doSomething(this.resourceService.findAll(filter), (res: Page<any>) => {
            this.page = res;
            this.loading = false;
            sessionStorage.setItem(this.componentName, JSON.stringify(this.filter));
        });
    }

    protected findAllFirst() {
        const filterJSON = sessionStorage.getItem(this.componentName);
        if (filterJSON) {
            this.filter = JSON.parse(filterJSON);
        }
        this.findAll(this.filter);
    }
}

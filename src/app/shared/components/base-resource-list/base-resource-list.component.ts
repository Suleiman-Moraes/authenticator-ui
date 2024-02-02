import { Component, Injector, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Filter } from "../../model/default/filter";
import { Page } from "../../model/default/page";
import { BaseResourceService } from "../base-resource-service/base-resource-service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

@Component({
    template: ''
})
export abstract class BaseResourceListComponent extends BaseResourceUtilComponent implements OnInit {

    router: Router;
    isAddParamUrl: boolean = true;
    page: Page<any> = {
        empty: true
    }

    protected filter: Filter = {
        paginate: true,
        size: 5,
        page: 0
    }
    protected titleService: Title;
    protected route: ActivatedRoute;

    constructor(
        injector: Injector,
        private resourceService: BaseResourceService
    ) {
        super(injector);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.titleService = injector.get(Title);
    }

    ngOnInit(): void {
        this.findAll(this.filter);
    }

    pageChange(event: Filter) {
        if(event.page || 0 == event.page){
            this.filter.page = event.page;
        }
        if(event.size){
            this.filter.size = event.size;
        }
        if(event.direction){
            this.filter.direction = event.direction;
        }
        if(event.property){
            this.filter.property = event.property;
        }
        this.findAll(this.filter);
    }

    serach(event: string) {
        alert(event);
    }

    protected findAll(filter: Filter) {
        this.loading = true;
        this.doSomething(this.resourceService.findAll(filter), (res: Page<any>) => this.page = res);
        setTimeout(() => {
            this.loading = false;
        }, 5000);
    }
}

import { Component, Injector, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { HandleError } from "../../handle-error/handle-error";
import { Filter } from "../../model/default/filter";
import { Page } from "../../model/default/page";
import { BaseResourceService } from "../base-resource-service/base-resource-service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

@Component({
    template: ''
})
export abstract class BaseResourceListComponent extends BaseResourceUtilComponent implements OnInit {

    loading: boolean = false;
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
    protected handleError: HandleError;

    constructor(
        injector: Injector,
        private resourceService: BaseResourceService
    ) {
        super(injector);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.titleService = injector.get(Title);
        this.handleError = injector.get(HandleError);
    }

    ngOnInit(): void {
        this.findAll(this.filter);
    }

    pageChange(event: Filter) {
        this.filter = {
            page: event.page,
            size: event.size
        }
        this.findAll(this.filter);
    }

    serach(event: string) {
        alert(event);
    }

    protected findAll(filter: Filter) {
        this.loading = true;
        this.resourceService.findAll(filter).subscribe(
            (res: Page<any>) => {
                this.page = res;
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.handleError.handleError(error);
            }
        );
    }
}

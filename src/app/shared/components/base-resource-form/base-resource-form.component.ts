import { Injector } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseResourceService } from "../base-resource-service/base-resource-service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

export abstract class BaseResourceFormComponent extends BaseResourceUtilComponent {

    form!: FormGroup;
    currentAction!: string;
    pageTitle!: string;
    complement = 'person';
    resource: any;
    detail: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;

    constructor(
        injector: Injector,
        protected resourceService: BaseResourceService
    ) {
        super(injector);
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);


    }

    get hasKey(): boolean {
        return this.resource && this.resource.id && this.resource.id > 0;
    }

    submitForm(): void {
        this.blockUI.start();
        this.markAllAsTouchedAndAsDirty(this.form);
        this.beforeSubmitForm();
        this.resource = this.form.value;
        this.resourceService.sendForm(this.resource, (this.resource.id != null && this.resource.id > 0)).subscribe(
            responseApi => {
                this.blockUI.stop();
                this.handleResponseSubimit(responseApi);
            }, err => {
                this.blockUI.stop();
                this.handleError.handleError(err);
            }
        );
    }

    //PRIVATES METHODS
    protected setCurrentAction(): void {
        if (this.route.snapshot.url[0].path == 'new') {
            this.currentAction = 'new';
        }
        else if (this.route.snapshot.url[0].path == 'detail') {
            this.currentAction = 'edit';
            this.detail = true;
        }
        else {
            this.currentAction = 'edit';
        }
    }

    protected loadResource(): void {
        if (this.currentAction == 'edit') {
            let id: any = this.route.snapshot.params['key'];
            if (id) {
                this.doSomething(this.resourceService.findById(Number(id)), (res: any) => {
                    this.resource = res;
                    this.patchValue();
                });
            }
        }
    }

    protected patchValue() {
        this.beforePatchValue();
        if (this.form) {
            this.form.patchValue(this.resource);
        }
        this.posLoadResource();
    }

    protected posLoadResource(): void {
        if (this.detail) {
            this.form.disable();
        }
    }

    protected handleResponseSubimit(responseApi: any): void {
        if (responseApi != null) {
            this.resource = responseApi;
            this.form.get('id')?.setValue(this.resource.id);
            this.beforePatchValue();
            this.afterSubmitFormSuccess();
            this.form.patchValue(this.resource);
        }
    }

    protected setPageTitle(): void {
        if (this.currentAction == 'new') {
            this.pageTitle = this.createPageTitle();
        }
        else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected createPageTitle(): string {
        return 'Novo';
    }

    protected editionPageTitle(): string {
        return 'Edição';
    }

    protected onInit(): void {
        this.setCurrentAction();
        this.initForm();
        this.loadResource();
    }

    protected afterContentChecked() {
        this.setPageTitle();
    }

    protected beforePatchValue(): void {/* This is intentional */ }
    protected beforeSubmitForm(): void {/* This is intentional */ }
    protected afterSubmitFormSuccess(): void {/* This is intentional */ }

    protected abstract initForm(): void;
}

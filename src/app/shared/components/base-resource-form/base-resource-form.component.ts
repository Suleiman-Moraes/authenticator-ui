import { inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseResourceService } from "../base-resource-service/base-resource-service";
import { BaseResourceUtilComponent } from "../base-resource-util/base-resource-util.component";

export abstract class BaseResourceFormComponent extends BaseResourceUtilComponent {

    form!: FormGroup;
    currentAction!: string;
    pageTitle!: string;
    complement = 'person';
    resource: any;
    detail: boolean = false;

    protected route: ActivatedRoute = inject(ActivatedRoute);

    constructor(
        protected resourceService: BaseResourceService
    ) {
        super();
    }

    get hasKey(): boolean {
        return this.resource && this.resource.key && this.resource.key > 0;
    }

    get isNew(): boolean {
        if (this.currentAction) {
            return this.currentAction == 'new';
        }
        else {
            return false;
        }
    }

    get isEdit(): boolean {
        if (this.currentAction) {
            return this.currentAction == 'edit';
        }
        else {
            return false;
        }
    }

    submitForm(): void {
        this.blockUI.start();
        this.markAllAsTouchedAndAsDirty(this.form);
        if (!this.verifyForm()) {
            this.blockUI.stop();
            return;
        }
        this.beforeSubmitForm();
        const key = this.resource?.key;
        this.resource = this.form.value;
        this.resource.key = key
        this.resourceService.sendForm(this.resource, (this.resource.key != null && this.resource.key > 0)).subscribe({
            next: (responseApi) => {
                this.blockUI.stop();
                this.handleResponseSubimit(responseApi);
            },
            error: (err) => {
                this.blockUI.stop();
                this.handleError.handleError(err);
            }
        });
    }

    openConfirmDialogAfterSave(): void {
        this.confirmationService.confirm({
            key: 'confirmAfterSave',
            message: `Registro ${this.currentAction == 'new' ? 'inserido' : 'atualizado'} com sucesso!`,
            header: 'Confirmação',
            icon: 'pi pi-check-circle',
            acceptLabel: 'Novo',
            rejectLabel: 'Listagem',
            acceptIcon: 'pi pi-plus mr-2',
            rejectIcon: 'pi pi-list mr-2',
            acceptButtonStyleClass: 'p-button',
            rejectButtonStyleClass: 'p-button',
            accept: () => {
                if (this.currentAction == 'edit') {
                    this.router.navigate(['../../new'], { relativeTo: this.route });
                }
                else {
                    this.initForm();
                }
            },
            reject: () => {
                switch (this.currentAction) {
                    case 'edit':
                        this.router.navigate(['../../'], { relativeTo: this.route });
                        break;
                    default:
                        this.router.navigate(['../'], { relativeTo: this.route });
                        break;
                }
            }
        });
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
            let key: any = this.route.snapshot.params['key'];
            if (key) {
                this.blockUI.start();
                this.doSomething(this.resourceService.findById(Number(key)), (res: any) => {
                    this.resource = res;
                    this.resource.key = key;
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
            this.resource.key = responseApi;
            this.form.get('key')?.setValue(responseApi);
            this.afterSubmitFormSuccess();
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

    protected verifyForm(): boolean {
        if (this.form.invalid) {
            this.showError('Preencha os campos obrigatórios');
            this.showError('Preencha os campos corretamente');
            return false;
        }
        return true;
    }

    protected beforePatchValue(): void {/* This is intentional */ }
    protected beforeSubmitForm(): void {/* This is intentional */ }
    protected afterSubmitFormSuccess(): void {/* This is intentional */ }

    protected abstract initForm(): void;
}

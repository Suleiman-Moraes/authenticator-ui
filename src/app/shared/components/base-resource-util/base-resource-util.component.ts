import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { HandleError } from "../../handle-error/handle-error";
import { AuthenticationService } from "../../service/authentication.service";

export abstract class BaseResourceUtilComponent {

    // [key: string]: any;

    @BlockUI()
    blockUI!: NgBlockUI;
    loading: boolean = false;

    protected location: Location = inject(Location);
    protected formBuilder: FormBuilder = inject(FormBuilder);
    protected confirmationService: ConfirmationService = inject(ConfirmationService);
    protected authenticationService: AuthenticationService  = inject(AuthenticationService);
    protected messageService: MessageService = inject(MessageService);
    protected handleError: HandleError = inject(HandleError);
    protected router: Router = inject(Router);

    imaskCpfCnpj = {
        mask: [
            {
                mask: "000.000.000-00"
            },
            {
                mask: "00.000.000/0000-00"
            }
        ]
    }

    yesNotEnum = {
        S: 'Sim',
        N: 'Não'
    };

    get yesNotEnumOptions(): Array<any> {
        if (!this['yesNotEnumOptionsVar']) {
            this['yesNotEnumOptionsVar'] = this.getTypes(this.yesNotEnum);
        }
        return this['yesNotEnumOptionsVar'];
    }

    convertToNumber(string: string): number {
        return Number(string).valueOf()
    }

    isNotNulAndNotEmpty(x: any): boolean {
        return x && x != '';
    }

    back(): void {
        this.location.back();
    }

    openConfirmDialog(message: string, accept: Function, reject: Function): void {
        this.confirmationService.confirm({
            message: message,
            header: 'Confirmação',
            icon: 'pi pi-info-circle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: accept,
            reject: reject
        });
    }

    havePermission(role: any): boolean {
        return this.authenticationService.havePermission(role);
    }

    callConfirmPopup(event: Event, accept: any, message: string = 'Tem certeza de que deseja prosseguir?', reject?: any, icon: string = 'pi pi-exclamation-triangle'): void {
        this.confirmationService.confirm({
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            target: event.target,
            message: message,
            icon: icon,
            accept: () => accept(),
            reject: () => {
                if (reject) {
                    reject();
                }
            }
        });
    }

    callConfirmPopupOut(event: Event, ...route: string[]): void {
        this.callConfirmPopup(event, () => this.router.navigate(route), 'Tem certeza de que deseja sair?');
    }

    callConfirmPopupSave(event: Event): void {
        this.callConfirmPopup(event, () => this.afterCallConfirmSaveSuccess(), 'Confirma os dados informados?');
    }

    //PRIVATES METHODS
    protected errorServer(): void {
        this.showError('Ocorreu um erro ao processar a sua solicitação.');
    }

    protected getTypes(type: any): any {
        return Object.entries(type).map(
            ([value, text]) => {
                return {
                    text: text,
                    value: value
                }
            }
        );
    }

    protected formId(required?: any): FormGroup {
        return this.formBuilder.group({
            id: [null, (required ? Validators.required : null)]
        });
    }

    protected markAllAsTouchedAndAsDirty(form: FormGroup): void {
        form.markAllAsTouched();
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                (control.valueChanges as EventEmitter<any>).emit(control.value);
                control.markAsDirty({ onlySelf: true });
            }
            else if (control instanceof FormGroup) {
                this.markAllAsTouchedAndAsDirty(control);
            }
        });
    }

    protected disableComponents(form: FormGroup, disable: boolean): void {
        Object.keys(form.controls).forEach(field => {
            const control = form.get(field);
            if (control instanceof FormControl) {
                if (disable) {
                    control.disabled;
                    control.disable();
                }
                else {
                    control.enabled;
                    control.enable();
                }
            }
            else if (control instanceof FormGroup) {
                this.disableComponents(control, disable);
            }
        });
    }

    protected disableControls(form: (FormGroup | any), name: string, disable: boolean): void {
        if (disable) {
            form.get(name).disabled;
            form.get(name).disable();
            form.get(name).setValue(null);
        }
        else {
            form.get(name).enabled;
            form.get(name).enable();
        }
    }

    protected doSomething(metodo: Observable<any>, successCallBack?: any, withoutHandleError = false, errorCallBack?: any): void {
        metodo.subscribe(
            {
                next(res: any) {
                    this.loading = false;
                    if (this.blockUI) {
                        this.blockUI.stop();
                    }
                    if (successCallBack != null) {
                        successCallBack(res);
                    }
                },
                error: (error: any) => {
                    this.loading = false;
                    if (this.blockUI) {
                        this.blockUI.stop();
                    }
                    if (errorCallBack != null) {
                        errorCallBack(error);
                    }
                    if (!withoutHandleError) {
                        this.handleError.handleError(error);
                    }
                }
            }
        );
    }

    /**
     * Perform a simple request, with the option of calls for success and error, but it will not call the error handle itself nor set the loading controls to false
     *
     * @param {any} metodo - the method to perform
     * @param {string} field - optional field to update with the result
     * @param {any} successCallBack - callback function for successful execution
     * @param {any} errorCallBack - callback function for error handling
     * @return {void}
     */
    protected doSomethingSimple(metodo: Observable<any>, successCallBack?: any, errorCallBack?: any): void {
        metodo.subscribe(
            {
                next(res: any) {
                    if (successCallBack != null) {
                        successCallBack(res);
                    }
                },
                error: (error: any) => {
                    if (errorCallBack != null) {
                        errorCallBack(error);
                    }
                }
            }
        );
    }

    protected showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
    }

    protected showSuccess(detail: string) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: detail });
    }

    protected showWarning(detail: string) {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: detail });
    }

    protected mountParams(filter: FormGroup, httpParams?: any, dad?: string): any {
        let params: any = httpParams ? httpParams : {};
        Object.keys(filter.controls).forEach(field => {
            const control = filter.get(field);
            const p = dad ? `${dad}.${field}` : field;
            if (control instanceof FormControl) {
                if (filter.get(field)?.value != null) {
                    params[`${p}`] = filter.get(field)?.value;
                }
            }
            else if (control instanceof FormGroup) {
                this.mountParams(control, params, p);
            }
        });
        return params;
    }

    protected handleCatchError(err: any) {
        this.handleError.handleError(err);
    }

    protected errorServidor(): void {
        this.showError('Ocorreu um erro ao processar a sua solicitação.');
    }


    protected showErrors(err: HttpErrorResponse) {
        try {
            if (err?.error?.messages?.length > 0) {
                err.error.messages.forEach((er: any) => this.showError(er));
            }
        } catch (e) { }
    }

    protected afterCallConfirmSaveSuccess(): void {}
}

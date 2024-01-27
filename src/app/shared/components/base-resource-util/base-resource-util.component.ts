import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Injector } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthenticationService } from "../../service/authentication.service";

export abstract class BaseResourceUtilComponent {

    // [key: string]: any;

    @BlockUI()
    blockUI!: NgBlockUI;

    protected location: Location;
    protected formBuilder: FormBuilder;
    protected confirmationService: ConfirmationService;
    protected authenticationService: AuthenticationService;
    protected messageService: MessageService;

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

    constructor(
        protected injector: Injector
    ) {
        this.location = this.injector.get(Location);
        this.formBuilder = this.injector.get(FormBuilder);
        this.confirmationService = this.injector.get(ConfirmationService);
        this.authenticationService = this.injector.get(AuthenticationService);
        this.messageService = this.injector.get(MessageService);
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
            acceptIcon: 'pi pi-check',
            acceptLabel: 'Sim',
            rejectIcon: 'pi pi-time',
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

    //PRIVATES METHODS
    protected tratarErro(err: any): void {
        if (typeof err === 'string') {
            this.showError(err);
        }
        else if (err instanceof HttpErrorResponse
            && err.status >= 400 && err.status <= 499) {
            if (err.status == 401) {
                this.errorServer();
            }
            else if (err.status == 403) {
                this.showError('Operação não autorizada.');
            }
            else {
                try {
                    if (err?.error?.messages?.length > 0) {
                        err.error.messages.forEach((er: any) => this.showError(er));
                    }
                } catch (e) { }
            }
        }
        else {
            this.errorServer();
        }
        console.log(err);
        console.error('Ocorreu um erro', err);
        this.posTratarErro();
    }

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

    protected doSimpleRequest(metodo: any, atributo: string, func: any): void {
        metodo.subscribe(
            (responseApi: any) => {
                if (responseApi != null) {
                    this[atributo] = responseApi;
                    if (func != null) {
                        func();
                    }
                }
            }, (err: any) => {
                this.tratarErro(err);
            }
        );
    }

    protected getSomething(metodo: any, atributo: string, func?: any): void {
        metodo.subscribe((res: any) => {
            this[atributo] = res;
            if (func != null) {
                func();
            }
        });
    }

    protected doSomething(metodo: any, func?: any): void {
        metodo.subscribe((res: any) => {
            if (func != null) {
                func(res);
            }
        });
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
        this.blockUI.stop();
        if (typeof err === 'string') {
            this.showError(err);
        }
        else if (err instanceof HttpErrorResponse
            && err.status >= 400 && err.status <= 499) {
            if (err.status == 401) {
                const erro = err?.error?.error_description;
                this.showError(erro ? erro : 'Operação não autorizada.');
            }
            else if (err.status == 403) {
                this.showError('Operação não autorizada.');
            }
            else {
                this.showErrors(err);
            }
        }
        else {
            this.errorServidor();
        }
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

    //OPICIONAIS
    protected posTratarErro(): void {/* This is intentional */ }
}

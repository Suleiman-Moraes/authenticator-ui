import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class HandleError implements ErrorHandler {

    @BlockUI()
    blockUI!: NgBlockUI;

    constructor(
        private messageService: MessageService
    ) { }

    handleError(error: any) {
        if (error instanceof TypeError) {
            console.log(error);
        }
        else {
            this.blockUI.stop();
            if (typeof error === 'string') {
                this.showError(error);
            }
            else if (error instanceof HttpErrorResponse
                && error.status >= 400 && error.status <= 499) {
                if (error.status == 403 || error.status == 401) {
                    this.showError('Operação não autorizada.');
                }
                else {
                    try {
                        if (error?.error?.messages?.length > 0) {
                            error.error.messages.forEach((er: any) => this.showError(er));
                        }
                        else if (error?.error?.message) {
                            this.showError(error?.error?.message)
                        }
                        else {
                            this.showError('Ocorreu um erro, tente novamente mais tarde!');
                        }
                    } catch (e) { }
                }
            }
            else {
                console.error(error);
                this.showError('Ocorreu um erro, tente novamente mais tarde!');
            }
        }
    }

    private showError(detail: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: detail });
    }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTemplateComponent } from '../input-template/input-template.component';

@Component({
    selector: 'app-select-list',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTemplateComponent,
        DropdownModule
    ],
    templateUrl: './select-list.component.html',
    styleUrl: './select-list.component.scss'
})
export class SelectListComponent implements OnInit, OnChanges {

    @Input('for-name') forName!: string;
    @Input('name') name!: string;
    @Input('form') form!: FormGroup;
    @Input() text: string = 'description';
    @Input() value: string = 'key';
    @Input('list-string') listString: boolean = false;
    @Input() editable: boolean = false;
    @Input() options!: any[];

    @Output('change') change: EventEmitter<any> = new EventEmitter<any>();

    itens: SelectItem[] = new Array();

    ngOnInit(): void {
        this.mountItens();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['options']) {
            this.options = changes['options'].currentValue;
            this.mountItens();
        }
    }

    selectionChange(event: any): void {
        this.change.emit(event);
    }

    onBlur(_: Event): void {
        this.form.get(this.forName)?.markAsDirty();
    }

    //PRIVATE METHODS
    private mountItens(): void {
        if (this.options) {
            this.itens = [];
            this.options.forEach(option => {
                if (this.listString) {
                    this.itens.push({
                        label: option,
                        value: option
                    });
                }
                else {
                    this.itens.push({
                        label: option[this.text],
                        value: option[this.value]
                    });
                }
            });
        }
    }
}

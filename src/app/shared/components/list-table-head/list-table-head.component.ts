import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { FormValidations } from '../../validator/form-validations';

@Component({
    selector: 'app-list-table-head',
    standalone: true,
    imports: [
        ButtonModule,
        InputGroupModule,
        InputTextModule,
        ToolbarModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './list-table-head.component.html',
    styleUrl: './list-table-head.component.scss'
})
export class ListTableHeadComponent implements OnInit {

    @Input() title: string = 'Listagem';

    @Output('serach-text') searchTextEvent: EventEmitter<string> = new EventEmitter<string>();

    form!: FormGroup;
    disabledClear: boolean = true;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            searchText: [null, [Validators.required, Validators.minLength(1), FormValidations.withoutSpace]]
        });
    }

    onInputSearch(event: any) {
        if (event.key == 'Enter') {
            this.serach();
        }
    }

    serach(): void {
        if (this.form.valid) {
            this.disabledClear = false;
            this.form.get('searchText')?.setValue(this.form.value.searchText.trim());
            this.searchTextEvent.emit(this.form.value.searchText);
        }
    }

    clear(): void {
        this.disabledClear = true;
        this.form.get('searchText')?.setValue('');
        this.searchTextEvent.emit(this.form.value.searchText);
    }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { PersonDTO } from 'src/app/shared/model/person/person-dto.model';
import { PersonMeService } from 'src/app/shared/service/person-me.service';

@Component({
    selector: 'app-person-me',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './person-me.component.html',
    styleUrl: './person-me.component.scss'
})
export class PersonMeComponent extends BaseResourceUtilComponent implements OnInit {

    form!: FormGroup;
    resource: PersonDTO;

    constructor(
        protected service: PersonMeService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadResource();
    }

    private initForm(): void {
        this.form = PersonDTO.createFormGroup(this.formBuilder);
    }

    private loadResource(): void {
        this.doSomething(this.service.getMe(), (res: PersonDTO) => {
            this.resource = res;
            this.form.patchValue(this.resource);
        });
    }
}

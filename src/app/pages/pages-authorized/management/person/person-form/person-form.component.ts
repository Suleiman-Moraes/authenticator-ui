import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';
import { PersonDTO } from 'src/app/shared/model/person/person-dto.model';
import { PersonService } from 'src/app/shared/service/person.service';

@Component({
    selector: 'app-person-form',
    standalone: true,
    imports: [
        CardModule,
        ToastModule,
        FormHeadComponent,
        FormFooterComponent
    ],
    templateUrl: './person-form.component.html',
    styleUrl: './person-form.component.scss'
})
export class PersonFormComponent extends BaseResourceFormComponent implements OnInit, AfterContentChecked {

    constructor(
        injector: Injector,
        protected service: PersonService
    ) {
        super(injector, service);
    }

    ngOnInit(): void {
        this.complement = 'person';
        this.onInit();
    }

    ngAfterContentChecked(): void {
        this.afterContentChecked();
    }

    protected initForm(): void {
        this.form = PersonDTO.createFormGroup(this.formBuilder);
        console.log(this.form);

    }

    protected override createPageTitle(): string {
        return 'Inserir Pessoa';
    }

    protected override editionPageTitle(): string {
        return 'Alterar Pessoa';
    }
}

import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { SelectListComponent } from 'src/app/shared/components/select-list/select-list.component';
import { ConstructionService } from 'src/app/shared/service/construction.service';

@Component({
    selector: 'app-construction-select-form',
    standalone: true,
    imports: [
        SelectListComponent
    ],
    templateUrl: './construction-select-form.component.html',
    styleUrl: './construction-select-form.component.scss'
})
export class ConstructionSelectFormComponent extends BaseResourceUtilComponent implements OnInit {

    @Input() form!: FormGroup;

    constructions: string[] = [];

    private service: ConstructionService = inject(ConstructionService);

    ngOnInit(): void {
        this.doSomethingSimple(this.service.getNameAll(), (res: string[]) => this.constructions = res);
    }
}

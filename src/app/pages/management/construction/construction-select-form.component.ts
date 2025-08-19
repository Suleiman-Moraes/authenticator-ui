import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { SelectListComponent } from 'src/app/shared/components/select-list/select-list.component';
import { ConstructionService } from 'src/app/shared/service/construction.service';

@Component({
    selector: 'app-construction-select-form',
    standalone: true,
    imports: [
        SelectListComponent,
        RippleModule
    ],
    template: `
<div class="grid formgrid">
  <app-select-list
    class="col-12 md:col-12"
    name="Construtora"
    [form]="form"
    for-name="constructionName"
    [options]="constructions"
    [list-string]="true"
    [editable]="true"
  >
  </app-select-list>
</div>
    `
})
export class ConstructionSelectFormComponent extends BaseResourceUtilComponent implements OnInit {

    @Input() form!: FormGroup;

    constructions: string[] = [];

    private service: ConstructionService = inject(ConstructionService);

    ngOnInit(): void {
        this.doSomethingSimple(this.service.getNameAll(), (res: string[]) => this.constructions = res);
    }
}

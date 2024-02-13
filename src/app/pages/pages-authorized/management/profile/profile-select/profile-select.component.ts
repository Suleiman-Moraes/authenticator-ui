import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseResourceUtilComponent } from 'src/app/shared/components/base-resource-util/base-resource-util.component';
import { SelectListComponent } from 'src/app/shared/components/select-list/select-list.component';
import { Page } from 'src/app/shared/model/default/page';
import { Direction } from 'src/app/shared/model/enum/direction';
import { KeyDescriptionDTO } from 'src/app/shared/model/key-description-dto.model';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
    selector: 'app-profile-select',
    standalone: true,
    imports: [
        SelectListComponent
    ],
    templateUrl: './profile-select.component.html',
    styleUrl: './profile-select.component.scss'
})
export class ProfileSelectComponent extends BaseResourceUtilComponent implements OnInit {

    @Input('form') form!: FormGroup;

    profiles: KeyDescriptionDTO[] = [];

    private profileService: ProfileService = inject(ProfileService);

    ngOnInit(): void {
        this.doSomethingSimple(this.profileService.findAll({ property: 'description', direction: Direction.ASC }), (res: Page<KeyDescriptionDTO>) => {
            this.profiles = res.content ? res.content : [];
        });
    }
}

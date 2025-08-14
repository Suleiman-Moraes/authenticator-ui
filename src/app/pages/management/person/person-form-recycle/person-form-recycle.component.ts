import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { UserFormRecycleComponent } from '../../user/user-form-recycle/user-form-recycle.component';

@Component({
    selector: 'app-person-form-recycle',
    standalone: true,
    imports: [
        InputComponent,
        UserFormRecycleComponent
    ],
    templateUrl: './person-form-recycle.component.html',
    styleUrl: './person-form-recycle.component.scss'
})
export class PersonFormRecycleComponent {

    @Input() form!: FormGroup;
    @Input('show-password') showPassword: boolean = true;
    @Input('show-profile-select') showProfileSelect: boolean = true;
}

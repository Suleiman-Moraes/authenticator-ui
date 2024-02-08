import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTemplateComponent } from 'src/app/shared/components/input-template/input-template.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { ProfileSelectComponent } from '../../profile/profile-select/profile-select.component';

@Component({
    selector: 'app-user-form-recycle',
    standalone: true,
    imports: [
        InputComponent,
        InputTemplateComponent,
        ReactiveFormsModule,
        PasswordModule,
        ProfileSelectComponent
    ],
    templateUrl: './user-form-recycle.component.html',
    styleUrl: './user-form-recycle.component.scss'
})
export class UserFormRecycleComponent {

    @Input() form: FormGroup;
    @Input('show-password') showPassword: boolean = true;

    onBlur(name: string): void {
        this.form.get(name)?.markAsDirty();
    }
}

import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { FormFooterComponent } from 'src/app/shared/components/form-footer/form-footer.component';
import { FormHeadComponent } from 'src/app/shared/components/form-head/form-head.component';

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
export class PersonFormComponent {

    complement = 'person';

}

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-form-footer',
    standalone: true,
    imports: [
        ButtonModule,
        ToolbarModule,
        RouterModule
    ],
    templateUrl: './form-footer.component.html',
    styleUrl: './form-footer.component.scss'
})
export class FormFooterComponent {

    @Input() complement: string = '';
}

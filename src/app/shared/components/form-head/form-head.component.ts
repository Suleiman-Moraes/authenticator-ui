import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
    selector: 'app-form-head',
    standalone: true,
    imports: [
        ButtonModule,
        ToolbarModule,
        RouterModule
    ],
    templateUrl: './form-head.component.html',
    styleUrl: './form-head.component.scss'
})
export class FormHeadComponent {

    @Input() title: string = 'Novo';
    @Input() complement: string = '';
}

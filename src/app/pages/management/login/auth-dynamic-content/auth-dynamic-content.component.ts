import { Component, inject, Input } from '@angular/core';
import { AppFloatingConfigurator } from 'src/app/layout/component/app.floatingconfigurator';
import { LayoutService } from 'src/app/layout/service/layout.service';

@Component({
    selector: 'app-auth-dynamic-content',
    imports: [
        AppFloatingConfigurator
    ],
    templateUrl: './auth-dynamic-content.component.html',
    styleUrl: './auth-dynamic-content.component.scss'
})
export class AuthDynamicContentComponent {
    layoutService: LayoutService = inject(LayoutService);

    @Input() title: string = '';
    @Input() subtitle: string = '';
}

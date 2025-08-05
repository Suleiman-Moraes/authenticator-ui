import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from "ng-block-ui";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterModule,
        BlockUIModule
    ],
    template: `
    <block-ui>
        <router-outlet></router-outlet>
    </block-ui>
    `
})
export class AppComponent { }

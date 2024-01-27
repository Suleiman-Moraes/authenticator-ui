import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { PagesUnauthorizedRoutingModule } from './pages-unauthorized-routing.module';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        PagesUnauthorizedRoutingModule,
        LoginComponent
    ],
})
export class PagesUnauthorizedModule {}

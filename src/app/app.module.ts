import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BlockUIModule } from 'ng-block-ui';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { HandleError } from './shared/handle-error/handle-error';
import { authInterceptor } from './shared/interceptor/auth.interceptor';

export function tokenGetter(): string | null {
    return sessionStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        BlockUIModule.forRoot({
            message: 'Carregando',
            delayStop: 500
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter
            }
        }),
        ToastModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
        { provide: ErrorHandler, useClass: HandleError },
        provideHttpClient(withInterceptors([authInterceptor])),
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        ConfirmationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

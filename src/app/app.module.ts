import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BlockUIModule } from 'ng-block-ui';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { HandleError } from './shared/handle-error/handle-error';
import { authInterceptor } from './shared/interceptor/auth.interceptor';

export function tokenGetter(): string | null {
    return sessionStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent
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
        ConfirmationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

import { LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(ptBr);

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
        ToastModule,
        TranslateModule.forRoot({
            defaultLanguage: 'pt',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        MessageService,
        { provide: ErrorHandler, useClass: HandleError },
        provideHttpClient(withInterceptors([authInterceptor])),
        ConfirmationService,
        { provide: LOCALE_ID, useValue: 'pt' }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        const defaultLanguage = 'pt';
        this.primengConfig.ripple = true;
        this.translateService.setDefaultLang(defaultLanguage);
        this.translate(defaultLanguage);
    }

    translate(lang: string) {
        this.translateService.use(lang);
        this.translateService.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    }
}

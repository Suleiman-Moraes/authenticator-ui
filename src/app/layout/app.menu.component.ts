import { Component, OnInit } from '@angular/core';
import { MenuService } from '../shared/service/menu.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private menuService: MenuService
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/pages'] }
                ]
            }
        ];
        this.menuService.findAll().subscribe({
            next: (res) => {
                this.model = res;
            }
        });
    }
}

import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-description-list',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './description-list.component.html',
    styleUrl: './description-list.component.scss'
})
export class DescriptionListComponent {

    @Input() set items(items: any[]) {
        this._items = [];
        if (items) {
            for (let i = 0; i < items.length; i += 2) {
                const i1 = items[i + 1];
                this._items.push({
                    i0: items[i],
                    i1: i1 ? i1 : null
                });
            }
        }
    };

    private _items: any[] = [];

    get items(): any[] {
        return this._items;
    }

    get mobile(): any {
        return window.innerWidth <= 767;
    }
}

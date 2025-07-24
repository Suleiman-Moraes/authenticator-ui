import { NgClass } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-description-list',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './description-list.component.html',
    styleUrl: './description-list.component.scss'
})
export class DescriptionListComponent implements OnInit {

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

    private screenWidth: number = 0;

    ngOnInit(): void {
        this.screenWidth = window.innerWidth;
    }

    get items(): any[] {
        return this._items;
    }

    get mobile(): any {
        return this.screenWidth <= 767;
    }

    @HostListener('window:resize', ['$event'])
    onResize(_: any) {
        this.screenWidth = window.innerWidth;
    }
}

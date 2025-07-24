import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNgCalendarMaskDirective } from '../../directives/prime-ng-calendar-mask.directive';
import { InputTemplateComponent } from '../input-template/input-template.component';

@Component({
    selector: 'app-input-date',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTemplateComponent,
        CalendarModule,
        PrimeNgCalendarMaskDirective
    ],
    templateUrl: './input-date.component.html'
})
export class InputDateComponent implements OnInit {

    @Input('for-name') forName!: string;
    @Input('name') name!: string;
    @Input('form') form!: FormGroup;
    @Input('min-date') minDate: Date | null = null;
    @Input('max-date') maxDate: Date | null = null;
    @Input('year-range-max') yearRangeMax: string | null = null;
    @Input('year-range-min') yearRangeMin: string | null = null;
    @Input() touch: boolean = false;

    @Input('date-format') dateFormat: string = 'dd/mm/yy';
    @Input('show-on-focus') showOnFocus: boolean = false;
    @Input('show-icon') showIcon: boolean = true;
    @Input('year-navigator') yearNavigator: boolean = true;
    @Input('month-navigator') monthNavigator: boolean = true;
    @Input('show-button-bar') showButtonBar: boolean = true;

    @Output('blur') blur: EventEmitter<any> = new EventEmitter<any>();

    yearRange: string | null = null;

    get touchUI(): any {
        return window.innerWidth <= 600;
    }

    ngOnInit(): void {
        const year = this.maxDate ? this.maxDate.getFullYear() : new Date().getFullYear();
        this.yearRangeMax = !this.yearRangeMax ? `${this.maxDate ? this.maxDate.getFullYear() : (year + 10)}` : this.yearRangeMax;
        this.yearRangeMin = !this.yearRangeMin ? `${this.minDate ? this.minDate.getFullYear() : (year - 110)}` : this.yearRangeMin;
        this.yearRange = !this.yearRange ? `${this.yearRangeMin}:${this.yearRangeMax}` : this.yearRange;
    }

    onBlur(event: any): void {
        this.form.get(this.forName)?.markAsDirty();
        this.blur.emit(event);
    }
}

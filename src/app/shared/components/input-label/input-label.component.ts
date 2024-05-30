import { Component, Input } from '@angular/core';
import { InputTemplateComponent } from '../input-template/input-template.component';

@Component({
  selector: 'app-input-label',
  standalone: true,
  imports: [
    InputTemplateComponent
  ],
  templateUrl: './input-label.component.html',
  styleUrl: './input-label.component.scss'
})
export class InputLabelComponent {

    @Input() name!: string;
    @Input() value: string = '';
}

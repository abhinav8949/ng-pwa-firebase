import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  imports: [],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.css'
})
export class SummaryCardComponent {
  
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() color!: string;
}

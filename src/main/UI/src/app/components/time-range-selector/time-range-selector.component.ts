import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-range-selector',
  templateUrl: './time-range-selector.component.html',
  styleUrls: ['./time-range-selector.component.css']
})
export class TimeRangeSelectorComponent {

  _currentDateTime = new Date();

  minTime = 7 * 60;
  maxTime = 19 * 60;
  step = 10;

  startValue : number = this.minTime;
  endValue : number = this.maxTime;

  @Output() startTimeEmitter = new EventEmitter<number>();
  @Output() endTimeEmitter = new EventEmitter<number>();


  ngOnInit(): void{
  }

  formatTime(minutes: number): string {
    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let period = "am";
    if (hours >= 13){
      hours = hours % 12;
      period = "pm";
    }
    return `${hours.toString().padStart(2, '')}:${mins.toString().padStart(2, '0')}${period} `;
  }

  onStartChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (value >= this.endValue) {
      this.startValue = this.endValue - this.step;
    } else {
      this.startValue = value;
    }
    this.startTimeEmitter.emit(this.startValue);
  }


  onEndChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    if (value <= this.startValue) {
      this.endValue = this.startValue + this.step;
    } else {
      this.endValue = value;
    }
    this.endTimeEmitter.emit(this.endValue);
  }
}

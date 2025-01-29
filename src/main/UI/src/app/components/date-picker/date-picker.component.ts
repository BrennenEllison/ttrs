import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
})
export class DatePickerComponent {
  selectedDate: Date = new Date();
  @Output() dateEmitter = new EventEmitter<Date>();


  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;

    const today = new Date();
    const startDate = today;
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 14);
    startDate.setDate(today.getDate() - 1);

    return date >= startDate && date <= endDate;
  };
  
  ngOnInit() {
  }

  onDateChange(): void{
    this.dateEmitter.emit(this.selectedDate);
  }

}

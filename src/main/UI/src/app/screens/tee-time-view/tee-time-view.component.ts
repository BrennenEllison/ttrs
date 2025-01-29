import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';

interface Time {
  hours: number,
  minutes : number
}

@Component({
  selector: 'app-tee-time-view',
  templateUrl: './tee-time-view.component.html',
  styleUrls: ['./tee-time-view.component.css']
})
export class TeeTimeViewComponent {

  selectedDate : Date = new Date();
  selectedStartTime : number = 420;
  selectedEndTime : number = 1140;


  courses!: Course[];
  selectedCourse: Course = new Course(1, "Cascadia");


  constructor(private router: Router, private courseService: CourseService){}

  ngOnInit(){
    (this.courseService.getCourseNames().subscribe(data => {
      this.courses = data;
      this.courseService.SetCourse(this.courses[0]);
    }));


  }

  title = 'UI';
  selectedHoleCount: number | null = null;

  onSelectedCourse(course: Course): void {
    this.selectedCourse = course;
  }
  
  setCourseData(data: any): void{
    this.courseService.SetCourse(data);
  }

  handleSelectedDate(info : Date) : void {
    this.selectedDate = info;
  }
  handleSelectedStartTime(info : number) {
    this.selectedStartTime = info;
  }
  handleSelectedEndTime(info : number) {
    this.selectedEndTime = info;
  }
  onSearch(){
    const s = this.formatTime(this.selectedStartTime);
    const e = this.formatTime(this.selectedEndTime);
    const d = this.formatDate(this.selectedDate);
    const searchURL = `/teetimes/search/${this.selectedCourse.id}/0/${d}T${s.hours.toString().padStart(2, '0')}:${s.minutes.toString().padStart(2, '0')}:00/${d}T${e.hours.toString().padStart(2, '0')}:${e.minutes.toString().padStart(2, '0')}:00`;
    this.setCourseData(this.selectedCourse);
    this.router.navigateByUrl(searchURL);
  }

  formatTime(minutes: number): Time{
    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const time : Time = {hours: hours, minutes:mins};
    return time;
  }

  formatDate(date : Date) : string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

}



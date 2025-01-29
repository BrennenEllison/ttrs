import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/common/course';
import { TeeTime } from 'src/app/common/tee-time';
import { CartService } from 'src/app/services/cart.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-confirmation-view',
  templateUrl: './confirmation-view.component.html',
  styleUrls: ['./confirmation-view.component.css']
})
export class ConfirmationViewComponent {

  teeTime!: TeeTime;
  course!: Course;

  constructor(private cartService: CartService,
              private courseService: CourseService
  ){}

  ngOnInit() : void {
    this.teeTime = this.cartService.getTeeTime();
    this.course = this.courseService.getCourse();
  }
}

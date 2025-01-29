import { Component, OnInit } from '@angular/core';
import { TeeTime } from 'src/app/common/tee-time';
import { TeeTimeService } from 'src/app/services/tee-time.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tee-time-list',
  templateUrl: './tee-time-list.component.html',
  styleUrls: ['./tee-time-list.grid.component.css']
})
export class TeeTimeListComponent {

  teeTimes: TeeTime[] = [];
  courseId : number = 1;
  bookingStatus : number = 0;
  startTime : string = "";
  endTime : string = "";
  _currentDate : Date = new Date();
  isLoading: boolean = false;

  constructor(private teeTimeService: TeeTimeService,
              private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listTeeTimes();
    });
  }

  listTeeTimes() {
    this.isLoading = true;
    //Course ID
    const hasCourseId : boolean = this.route.snapshot.paramMap.has("id");
    if (hasCourseId){this.courseId = +this.route.snapshot.paramMap.get("id")!;}
    else{this.courseId = 1;}

    //Booking Status
    const hasBookingStatus : boolean = this.route.snapshot.paramMap.has("status");
    if(hasBookingStatus){this.bookingStatus = +this.route.snapshot.paramMap.get("status")!;}
    else{this.bookingStatus=0}

    //Start Time
    const hasStartTime : boolean = this.route.snapshot.paramMap.has("startTime");
    if (hasStartTime) {
      this.startTime = this.route.snapshot.paramMap.get("startTime")!;
    }
    else { 
            this.startTime = this.toLocalDateTime(this._currentDate);}

    //EndTime
    const hasEndTime : boolean = this.route.snapshot.paramMap.has("endTime");
    if (hasEndTime) {this.endTime = this.route.snapshot.paramMap.get("endTime")!;}
    else {  this._currentDate.setHours(20); 
            this._currentDate.setMinutes(0);
            this.endTime = this.toLocalDateTime(this._currentDate);}
    
    let now = new Date();
    let time = new Date(this.startTime);
    if(time.getDate() == now.getDate() && time.getMonth() == now.getMonth()){
      if (time.getHours() < now.getHours())
        {
            time.setMinutes(now.getMinutes());
            time.setHours(now.getHours());
            this.startTime = this.toLocalDateTime(time);
        }
    }

      this.teeTimeService.getTeeTimeList(this.courseId, this.bookingStatus, this.startTime, this.endTime, 27).subscribe(data => {
        setTimeout(()=>{
          this.teeTimes = data;
          this.isLoading = false;
        }, 200)
      });
  
  }

  onClick(teeTime: TeeTime){
    this.cartService.setTeeTime(teeTime);
    this.router.navigateByUrl('/checkout');
  }



  getClass(date : Date) : string {
    const _currentDate = new Date(date);
    if (_currentDate.getHours() > 16){
      return "twilight";
    }else { return "daylight";}
  }

  getCardClass(date : Date) : string {
    const _currentDate = new Date(date);
    if (_currentDate.getHours() > 16){
      return "list-card-title-twilight";
    }else { return "list-card-title-daylight";}
  }

  toLocalDateTime(date : Date) : string{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }


}

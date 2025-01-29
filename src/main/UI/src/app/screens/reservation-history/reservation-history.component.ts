import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from 'src/app/common/reservation';
import { ReservationHistory } from 'src/app/common/reservation-history';
import { ReservationHistoryService } from 'src/app/services/reservation-history.service';
import { ReservationHistoryDialogComponent } from 'src/app/components/reservation-history-dialog/reservation-history-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit{
  storage: Storage = sessionStorage;
  reservations!: ReservationHistory[];
  reservation!: Reservation;
  selectedReservation: number | null = null;
  errorMessage: string | null = null;
  readonly dialog = inject(MatDialog);
  currDate: Date = new Date(Date.now());


  constructor(private router: Router, 
    private reservationHistoryService: ReservationHistoryService){}


  ngOnInit(): void {
    let email = this.storage.getItem("userEmail");
    
    
    if (email){
      this.reservationHistoryService.getReservationHistoryList(email.replace(/"/g, '')).subscribe(data => {
        this.reservations = data;
      });
    }

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

  onClickActiveCard(reservationId: number): void{
    this.selectedReservation = reservationId; 
  }

  onCancelReservation(reservation:ReservationHistory): void {
    let response;
    let currentDate = new Date();
    let startTime = new Date(reservation.startTime);
    startTime.setHours(startTime.getHours() - 2);

    if(currentDate < startTime ){
      this.reservationHistoryService.deleteReservation(reservation.id).subscribe({
        next: (data) => {
          response = data
          this.reservations = this.reservations.filter(reservation => reservation.id !== reservation.id);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]); 
          });
        },
        error: (error) => {
          this.errorMessage = error.message;
        },
      });
    }
    else {
      this.openDialog("0ms", "0ms");
    }
  }
  
  onEditAddons(reservation: ReservationHistory): void {
    this.router.navigateByUrl(`/reservation/edit/${reservation.id}`);
    
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ReservationHistoryDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  isActive(startTime:Date): boolean {
    const start = new Date(startTime);
    if (start > this.currDate){
        return true;
    }
    else{
      return false;
    } 
}


}

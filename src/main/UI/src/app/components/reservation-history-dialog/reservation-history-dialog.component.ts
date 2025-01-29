import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialog, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-history-dialog',
  templateUrl: './reservation-history-dialog.component.html',
  styleUrls: ['./reservation-history-dialog.component.css']
})
export class ReservationHistoryDialogComponent {
  readonly dialogRef = inject((MatDialogRef<ReservationHistoryDialogComponent>))
}

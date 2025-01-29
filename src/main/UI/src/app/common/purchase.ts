import { Customer } from "./customer";
import { TeeTime } from "./tee-time";
import { Reservation } from "./reservation";
import { ReservationAddon } from "./reservation-addon";

export class Purchase {
    customer!: Customer;
    teeTime!: TeeTime;
    reservation!: Reservation;
    reservationAddons!: ReservationAddon[];

}

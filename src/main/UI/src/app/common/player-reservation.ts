import { Customer } from "./customer";
import { ReservationAddon } from "./reservation-addon";
import { TeeTime } from "./tee-time";

export class PlayerReservation {
    constructor(
        public customer: Customer,
        public dateCreated: Date,
        public id: number,
        public lastUpdated: Date,
        public playerCount: number,
        public reservationAddons: ReservationAddon[],
        public status: boolean,
        public teeTime: TeeTime,
        public totalPrice: number
){}
    
}

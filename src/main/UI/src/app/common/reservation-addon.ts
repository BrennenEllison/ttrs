import { CartItem } from "./cart-item";
import { Reservation } from "./reservation";

export class ReservationAddon {
    id: number | null;
    unitPrice: number;
    quantity: number;
    reservation!: number;
    addonId: string;

    constructor(cartItem: CartItem){
        this.unitPrice = cartItem.unitPrice;
        this.quantity = cartItem.quantity;
        this.addonId = cartItem.id;
        this.id = cartItem.reservationAddonId;
    }

}

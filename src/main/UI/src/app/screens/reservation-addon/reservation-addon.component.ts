import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Addon } from 'src/app/common/addon';
import { CartItem } from 'src/app/common/cart-item';
import { PlayerReservation } from 'src/app/common/player-reservation';
import { ReservationAddon } from 'src/app/common/reservation-addon';
import { TeeTime } from 'src/app/common/tee-time';
import { AddonService } from 'src/app/services/addon.service';
import { ReservationHistoryService } from 'src/app/services/reservation-history.service';

@Component({
  selector: 'app-reservation-addon',
  templateUrl: './reservation-addon.component.html',
  styleUrls: ['./reservation-addon.component.css']
})
export class ReservationAddonComponent {

  reservation!: PlayerReservation;
  addons: Addon[] = [];
  reservationAddons: ReservationAddon[] = [];
  disabledList: string[] = [];
  selectedAddons: string[] =  [];
  cartItems : CartItem[] = [];
  reservationId!: number;

  constructor(private router: Router, 
    private reservationHistoryService: ReservationHistoryService,
    private route: ActivatedRoute,
    private addonService: AddonService){}

  ngOnInit(): void {

    let hasReservationId = this.route.snapshot.paramMap.has("id");
    if(hasReservationId){this.reservationId = +this.route.snapshot.paramMap.get("id")!;}
    else{this.reservationId = 1;}

  forkJoin({
    reservation: this.reservationHistoryService.getReservation(this.reservationId),
    addons: this.addonService.getAddonList()
  }).subscribe({
    next: ({ reservation, addons }) => {
      this.reservation = reservation;
      this.reservationAddons = reservation.reservationAddons;

      this.addons = addons;

      this.configureAddons();
    },
    error: err => {
      console.log(err);
    }
  });

  }

  addCartItem(){
    if(this.cartItems.length < this.addons.length){
      let item = new CartItem();
      this.cartItems.push(item);
      }
  }
  

  removeCartItem(item: any){
    this.cartItems = this.cartItems.filter(element => element != item);
    this.disabledList = this.disabledList.filter(element => element != item.name)
  }

  decrementPlayerCount() : void{
    if (this.reservation.playerCount > 0){
      this.reservation.playerCount--;
    }
  }
  incrementPlayerCount() : void{
    if(this.reservation.playerCount < 3){
      this.reservation.playerCount++;
    }
  }

  onAddonSelection(addon: Addon, item:any):void{
    item.quantity = 0;
    item.name = addon.name;
    item.unitPrice = addon.unitPrice;
    item.description = addon.description;
    item.id = addon.id;
    this.disabledList.push(addon.name);
  }

  decrementItemQuantity(item: any) : void{
    if (item.quantity > 0){
      item.quantity--;
    }
}
  
incrementItemQuantity(item: any) : void{
    if (item.quantity < 4) {
      item.quantity++;
    }
}
isDisabled(addon: Addon): boolean{
  return this.disabledList.includes(addon.name);
}

configureAddons(): void {
  this.reservationAddons.forEach(resAddon=> {
    let addon = this.addons.find(a => a.id == resAddon.addonId);
    if (addon){
      let item = new CartItem();
      if(this.cartItems.length < this.addons.length){
        item.quantity = resAddon.quantity;
        item.name = addon.name;
        item.unitPrice = addon.unitPrice;
        item.description = addon.description;
        item.id = addon.id;
        item.reservationAddonId = resAddon.id;
        this.disabledList.push(addon.name);
        this.cartItems.push(item);
        this.selectedAddons.push(addon.name)
      }
    }
  });
}

onSaveReservationAddons(){
  this.reservation.reservationAddons = [];
  let reservationAddons: ReservationAddon[] = this.cartItems.map(tempCartItem => new ReservationAddon(tempCartItem));
  reservationAddons.forEach(addon => {
    addon.reservation = this.reservationId;
  });

  this.reservation.reservationAddons = reservationAddons;

  this.reservationHistoryService.updateReservation(this.reservation.id, this.reservation).subscribe(data=>{
  });

  this.router.navigateByUrl('/reservation/history');
}

}

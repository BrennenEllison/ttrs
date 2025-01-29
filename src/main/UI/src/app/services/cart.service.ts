import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { TeeTime } from '../common/tee-time';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems: CartItem[] = [];

  private teeTime!: TeeTime;
  storage: Storage = sessionStorage;
  teeTimeStatus: boolean = false;
  

  constructor() { 

    let data = JSON.parse(this.storage.getItem("teeTime")!);

    if (data != null){
      this.teeTime = data;
    }
  }

  setTeeTimeStatus(status: boolean): void {
    this.teeTimeStatus = status;
  }
  getTeeTimeStatus(): boolean {
    return this.teeTimeStatus;
  }


  setTeeTime(teeTime: TeeTime): void {
    this.teeTime = teeTime;
    this.setTeeTimeStatus(true);
    this.persistTeeTime();
  }

  getTeeTime(): TeeTime{
    return this.teeTime;
  }

  persistTeeTime(){
    this.storage.setItem("teeTime", JSON.stringify(this.teeTime));
  }
}

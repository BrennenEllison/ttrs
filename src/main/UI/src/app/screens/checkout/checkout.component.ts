import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { AddonService } from 'src/app/services/addon.service';
import { Addon } from 'src/app/common/addon';
import { TeeTime } from 'src/app/common/tee-time';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/common/reservation';
import { ReservationAddon } from 'src/app/common/reservation-addon';
import { Purchase } from 'src/app/common/purchase';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/common/course';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  storage: Storage = sessionStorage;

  checkoutFormGroup!: FormGroup;
  cartItems : CartItem[] = [];
  addons: Addon[] = [];
  disabledList: string[] = [];


  constructor(private formBuilder: FormBuilder, 
              private addonService: AddonService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private courseService: CourseService,
              private router: Router){}

  playerCount : number = 0;
  cartCount: number = 0;
  teeCount: number = 0;
  ballsCount: number = 0;
  teeTime!: TeeTime;

  taxTotal: number = 0;
  subTotal: number = 0;
  finalTotal: number = 0;

  course!: Course;


  ngOnInit(): void {
    this.teeTime = this.cartService.getTeeTime();
    this.course = this.courseService.getCourse();

    this.addonService.getAddonList().subscribe(data=>{
      this.addons = data;
    });

    const { userEmail: email, firstName, lastName, phoneNumber } = {
      userEmail: this.stripQuotes(this.storage.getItem("userEmail")),
      firstName: this.stripQuotes(this.storage.getItem("firstName")),
      lastName: this.stripQuotes(this.storage.getItem("lastName")),
      phoneNumber : this.stripQuotes(this.storage.getItem("phoneNumber"))
    };



    this.checkoutFormGroup = this.formBuilder.group({
      playerInformation: this.formBuilder.group({
        firstName: [firstName || '', [Validators.required, 
                        Validators.maxLength(20), Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/i)
                      ]],
        lastName: [lastName || '', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/i)]],
        phone: [phoneNumber || '', [Validators.required, Validators.maxLength(10), Validators.pattern(/^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/)]],
        email: [email || '', [Validators.required, Validators.email]],
      }),
    });

  }

  addCartItem(){
    if(this.cartItems.length < this.addons.length){
    let item = new CartItem();
    this.cartItems.push(item);
    }
  }
  removeCartItem(item: CartItem){
    this.cartItems = this.cartItems.filter(element => element != item);
    this.disabledList = this.disabledList.filter(element => element != item.name)
  }
  onAddonSelection(addon: Addon, item:CartItem):void{
    item.quantity = 0;
    item.name = addon.name;
    item.unitPrice = addon.unitPrice;
    item.description = addon.description;
    item.id = addon.id;
    this.disabledList.push(addon.name);
  }

  decrementItemQuantity(item: CartItem) : void{
      if (item.quantity > 0){
        item.quantity--;
      }
  }
    
  incrementItemQuantity(item: CartItem) : void{
      item.quantity++;
  }

  decrementPlayerCount() : void{
    if (this.playerCount > 0){
      this.playerCount--;
    }
  }
  incrementPlayerCount() : void{
    if(this.playerCount < 3){
      this.playerCount++;
    }
  }

  regValidator(name: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = name.test(control.value);
      return result ? { name: {value: control.value }} : null;
    }
  }


  computeTotals(): void {
    this.resetTotals();
    this.cartItems = this.cartItems.filter(element => element.quantity != 0);
    const greenFare = this.teeTime.unitPrice;
    this.subTotal += (greenFare * this.playerCount) + greenFare;
    for(let item of this.cartItems){
      this.subTotal += item.unitPrice * item.quantity;
    }
    this.taxTotal = this.subTotal * 0.06;
    this.finalTotal = this.taxTotal + this.subTotal;
  }
  resetTotals(): void{
    this.subTotal = 0;
    this.taxTotal = 0;
    this.finalTotal = 0;
  }

  onSubmit(): void{
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let reservation = new Reservation();
    reservation.totalPrice = this.finalTotal;
    reservation.playerCount = this.playerCount + 1;

    // map cart items to reservation Addons
    let reservationAddons: ReservationAddon[] = this.cartItems.map(tempCartItem => new ReservationAddon(tempCartItem));

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['playerInformation'].value;
    purchase.teeTime = this.teeTime;
    purchase.reservation = reservation;
    purchase.reservationAddons = reservationAddons;

    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        this.resetTotals();
        this.checkoutFormGroup.reset();
        this.checkoutService.setFormStatus(true);
        this.router.navigateByUrl("/confirmation")
      },
      error: err=>{
        alert(`Error: ${err.message}`);
      }
    })
  }

  onSelectionChange(event: StepperSelectionEvent): void {
    const stepIndex = event.selectedIndex;

    switch(stepIndex){
      case 0: 
        this.resetTotals();
        break;
      case 1:
        this.resetTotals();
        break;
      case 2:
        this.computeTotals();
        break;
      default:
        break;

    }
  }

  isDisabled(addon: Addon): boolean{
    return this.disabledList.includes(addon.name);
  }

  stripQuotes(value: string | null): string {
    return value ? value.replace(/^['"]|['"]$/g, '') : '';
  }

}

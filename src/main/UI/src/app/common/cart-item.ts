export class CartItem {
    id!: string;
    name: string;
    unitPrice: number;
    quantity: number;
    description: string;
    reservationAddonId!: number | null;


    constructor(name: string = '', 
                unitPrice: number = 0, 
                quantity: number = 0,
                description: string = '',){
        this.name=name;
        this.unitPrice=unitPrice;
        this.quantity=quantity;
        this.description=description;
    }

}

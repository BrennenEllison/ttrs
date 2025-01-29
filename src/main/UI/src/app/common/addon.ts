export class Addon {
    id: string;
    name: string;
    unitPrice: number;
    description: string;

    constructor(id: string, 
                name: string, 
                unitPrice: number, 
                description: string){
        this.id = id;
        this.name = name;
        this.unitPrice = unitPrice;
        this.description = description;
    }
}

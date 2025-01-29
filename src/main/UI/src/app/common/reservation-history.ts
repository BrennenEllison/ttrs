export class ReservationHistory {
    constructor(public startTime: Date,
                public holeCount: number,
                public courseName: string,
                public totalPrice: number,
                public status: boolean,
                public id: number
    ){}

}

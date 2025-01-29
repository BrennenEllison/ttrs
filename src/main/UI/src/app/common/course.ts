export class Course {
    public id!: number;
    public courseName!: string;
    public address!: string;
    public phone!: string;

    constructor(id: number, courseName: string){
        this.id = id;
        this.courseName = courseName;
    }
}

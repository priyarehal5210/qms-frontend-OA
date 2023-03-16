export class Tasks {
    id: number;
    name: string;
    description: string;
    startDate: any;
    endDate: any;

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.startDate = null;
        this.endDate = null;
    }
}
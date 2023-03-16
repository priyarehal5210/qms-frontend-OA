export class AssignTask {
    id: number;
    registerId: number;
    tasksId: number;
    checked: boolean;
    success:any;
    constructor() {
        this.id = 0
        this.registerId = 0;
        this.tasksId = 0;
        this.checked = false;
        this.success=null;
    }
}
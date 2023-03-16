export class Register {
    id: number;
    userName: string;
    email: any;
    emailConfirm: any;
    password: any;
    confirmPassword: any;
    approved: any;
    role: any;
    // token:any;
    constructor() {
        this.id = 0;
        this.userName = "";
        this.email = null;
        this.emailConfirm = null
        this.password = null;
        this.confirmPassword = null;
        this.approved = null;
        this.role = null;
        // this.token=null
    }
}
export class Login {
    // id: number;
    Email: any;
    Password: any;
    // remember:any;
    constructor() {
        // this.id = 0;
        this.Email = null;
        this.Password = null;
        // this.remember=null;
    }
}
export class ApproveVm {
    email:any;
    constructor() {
        this.email=null;
    }
}

export class Status {
    register: any;
    tasks: any;
    token: any;
    constructor() {
        this.register = null;
        this.tasks = null;
        this.token = null;
    }
}

export class UserWithTask {
    id: number;
    register: any;
    tasks: any;
    constructor() {
        this.id = 0;
        this.tasks = null;
        this.register = null;
    }
}
export class Success {
    id: number;
    tasks: any;
    assignTasks: any;
    assignTasksId: any;
    hours:any;
    date: any;
    success: any;
    register: any;
    constructor() {
        this.id = 0;
        this.tasks = null;
        this.assignTasks = null;
        this.assignTasksId = null;
        this.hours=null;
        this.date = null;
        this.success = null;
        this.register = null;
    }
}
export class AddSuccess {
    id: number;
    date: any;
    assignTasksId: any;
    success: any;
    hours:any;
    constructor() {
        this.id = 0;
        this.date = null;
        this.assignTasksId = 0;
        this.success = null;
        this.hours=null;
    }
}
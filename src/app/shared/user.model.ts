export class User {
    public id: number;
    constructor(public username: string, public password?: string, public email?: string) { 
        this.id = Math.floor(Math.random() * 1000000);
    }
}